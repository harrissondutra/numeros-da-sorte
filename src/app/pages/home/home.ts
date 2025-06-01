import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../../components/toolbar/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NumerosService } from '../../services/numeros.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatSnackBarModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  // Título exibido no topo do card
  title = 'Números da Sorte';
  
  // Quantidade máxima de números que podem ser gerados
  quantidadeMaxima: number | null = null;
  
  // Quantidade de números a serem gerados
  quantidadeNumeros: number | null = null;

  // Array com os números gerados
  numerosGerados: number[] = [];

  constructor(
    private numerosService: NumerosService,
    private snackBar: MatSnackBar
  ) {}

  // Função para limpar os campos do formulário
  limparCampos() {
    this.quantidadeMaxima = null;
    this.quantidadeNumeros = null;
    this.numerosGerados = [];
  }

  // Função chamada quando o usuário clica em "Gerar Números"
  gerarNumeros() {
    if (this.quantidadeMaxima && this.quantidadeNumeros) {
      try {
        this.numerosGerados = this.numerosService.gerarNumerosAleatorios(
          this.quantidadeNumeros,
          this.quantidadeMaxima
        );
        
        // Exibe mensagem de sucesso
        this.snackBar.open('Números gerados com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      } catch (erro: any) {
        // Exibe mensagem de erro
        this.snackBar.open(erro.message, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }
    }
  }
}
