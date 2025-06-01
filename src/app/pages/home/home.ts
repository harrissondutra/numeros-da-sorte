import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../../components/toolbar/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NumerosService } from '../../services/numeros.service';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent, 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  // Injeção de dependências
  private readonly snackBar = inject(MatSnackBar);
  private readonly numerosService = inject(NumerosService);
  private readonly clipboard = inject(Clipboard);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly destroyRef = inject(DestroyRef);

  // Sinais reativos
  protected readonly quantidadeMaxima = signal<number | null>(null);
  protected readonly quantidadeNumeros = signal<number | null>(null);
  protected readonly numerosGerados = signal<number[]>([]);
  protected readonly isMobile = signal<boolean>(false);

  constructor() {
    // Observa mudanças no tamanho da tela
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => this.isMobile.set(result.matches));
  }

  // Função para limpar os campos do formulário
  protected limparCampos(): void {
    this.quantidadeMaxima.set(null);
    this.quantidadeNumeros.set(null);
    this.numerosGerados.set([]);
  }

  // Função para mostrar o SnackBar
  private showSnackBar(message: string, isError = false): void {
    const config: MatSnackBarConfig = {
      duration: isError ? 5000 : 3000,
      horizontalPosition: this.isMobile() ? 'center' as const : 'right' as const,
      verticalPosition: this.isMobile() ? 'top' as const : 'bottom' as const,
      panelClass: isError ? ['error-snackbar'] : ['success-snackbar']
    };

    this.snackBar.open(message, 'Fechar', config);
  }

  // Função para copiar os números para a área de transferência
  protected copiarNumeros(): void {
    const numeros = this.numerosGerados();
    if (numeros.length > 0) {
      this.clipboard.copy(numeros.join(', '));
      this.showSnackBar('Números copiados para a área de transferência!');
    }
  }

  // Função chamada quando o usuário clica em "Gerar Números"
  protected gerarNumeros(): void {
    const quantidade = this.quantidadeNumeros();
    const maximo = this.quantidadeMaxima();

    if (quantidade && maximo) {
      try {
        const numeros = this.numerosService.gerarNumerosAleatorios(quantidade, maximo);
        this.numerosGerados.set(numeros);
        this.showSnackBar('Números gerados com sucesso!');
      } catch (erro: any) {
        this.showSnackBar(erro.message, true);
      }
    }
  }
}
