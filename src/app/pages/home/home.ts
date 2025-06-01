import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../../components/toolbar/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NumerosService } from '../../services/numeros.service';
import { MatSnackBar, MatSnackBarModule, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  styleUrl: './home.scss'
})
export class HomeComponent {
  private snackBar = inject(MatSnackBar);
  private numerosService = inject(NumerosService);
  private clipboard = inject(Clipboard);
  private breakpointObserver = inject(BreakpointObserver);

  // Título exibido no topo do card
  title = 'Números da Sorte';
  
  // Quantidade máxima de números que podem ser gerados
  quantidadeMaxima: number | null = null;
  
  // Quantidade de números a serem gerados
  quantidadeNumeros: number | null = null;

  // Array com os números gerados
  numerosGerados: number[] = [];

  // Flag para dispositivo móvel
  isMobile = false;

  constructor() {
    // Observa mudanças no tamanho da tela
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  // Função para limpar os campos do formulário
  limparCampos() {
    this.quantidadeMaxima = null;
    this.quantidadeNumeros = null;
    this.numerosGerados = [];
  }

  // Função para mostrar o SnackBar
  private showSnackBar(message: string, isError = false) {
    const config: MatSnackBarConfig = {
      duration: isError ? 5000 : 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [isError ? 'error-snackbar' : 'success-snackbar']
    };

    this.snackBar.open(message, '', config);
  }

  // Função para copiar os números para a área de transferência
  copiarNumeros() {
    if (this.numerosGerados.length > 0) {
      const numerosTexto = this.numerosGerados.join(', ');
      this.clipboard.copy(numerosTexto);
      this.showSnackBar('Números copiados para a área de transferência!');
    }
  }

  // Função chamada quando o usuário clica em "Gerar Números"
  gerarNumeros() {
    if (this.quantidadeMaxima && this.quantidadeNumeros) {
      try {
        this.numerosGerados = this.numerosService.gerarNumerosAleatorios(
          this.quantidadeNumeros,
          this.quantidadeMaxima
        );
        
        this.showSnackBar('Números gerados com sucesso!');
      } catch (erro: any) {
        this.showSnackBar(erro.message, true);
      }
    }
  }
}
