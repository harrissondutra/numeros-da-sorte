import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Clipboard } from '@angular/cdk/clipboard';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ToolbarComponent } from '../../components/toolbar/toolbar';
import { NumerosService } from '../../services/numeros.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    ToolbarComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  // Serviços
  private readonly snackBar = inject(MatSnackBar);
  private readonly numerosService = inject(NumerosService);
  private readonly clipboard = inject(Clipboard);
  private readonly breakpointObserver = inject(BreakpointObserver);

  // Estado da aplicação
  protected readonly quantidadeMaxima = signal<number | null>(null);
  protected readonly quantidadeNumeros = signal<number | null>(null);
  protected readonly numerosGerados = signal<number[]>([]);
  protected readonly isMobile = signal<boolean>(false);

  // Computed properties
  protected readonly formValido = computed(() => 
    this.quantidadeMaxima() !== null && 
    this.quantidadeNumeros() !== null &&
    this.quantidadeMaxima()! > 0 &&
    this.quantidadeNumeros()! > 0 &&
    this.quantidadeNumeros()! <= this.quantidadeMaxima()!
  );

  protected readonly temNumerosGerados = computed(() => this.numerosGerados().length > 0);

  protected readonly numerosOrdenados = computed(() => 
    [...this.numerosGerados()].sort((a, b) => a - b)
  );

  constructor() {
    // Configura o observer de responsividade
    this.setupMobileObserver();
    // Configura efeitos
    this.setupEffects();
  }

  // Setup de observers
  private setupMobileObserver(): void {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
      .pipe(takeUntilDestroyed())
      .subscribe(result => this.isMobile.set(result.matches));
  }

  // Setup de efeitos
  private setupEffects(): void {
    effect(() => {
      if (this.temNumerosGerados()) {
        this.showSnackBar('Números gerados com sucesso!');
      }
    });
  }

  // Ações do usuário
  protected limparCampos(): void {
    this.quantidadeMaxima.set(null);
    this.quantidadeNumeros.set(null);
    this.numerosGerados.set([]);
  }

  protected copiarNumeros(): void {
    const numeros = this.numerosOrdenados();
    if (numeros.length > 0) {
      this.clipboard.copy(numeros.join(', '));
      this.showSnackBar('Números copiados para a área de transferência!');
    }
  }

  protected gerarNumeros(): void {
    if (!this.formValido()) return;

    try {
      const numeros = this.numerosService.gerarNumerosAleatorios(
        this.quantidadeNumeros()!,
        this.quantidadeMaxima()!
      );
      this.numerosGerados.set(numeros);
    } catch (erro: any) {
      this.showSnackBar(erro.message, true);
    }
  }

  // Utilitários
  private showSnackBar(message: string, isError = false): void {
    this.snackBar.open(message, 'Fechar', {
      duration: isError ? 5000 : 3000,
      horizontalPosition: this.isMobile() ? 'center' : 'right',
      verticalPosition: this.isMobile() ? 'top' : 'bottom',
      panelClass: isError ? ['error-snackbar'] : ['success-snackbar']
    });
  }
}
