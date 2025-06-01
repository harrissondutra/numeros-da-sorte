import { Component } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ToolbarComponent, 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  // Título exibido no topo do card - altere aqui para mudar o título
  title = 'Números da Sorte';
  
  // Quantidade máxima de números que podem ser gerados (sem valor inicial)
  quantidadeMaxima: number | null = null;
  
  // Quantidade inicial de números a serem gerados
  quantidadeNumeros: number | null = null;

  // Função chamada quando o usuário clica em "Gerar Números"
  gerarNumeros() {
    if (this.quantidadeMaxima && this.quantidadeNumeros) {
      console.log(`Gerando ${this.quantidadeNumeros} números até o número ${this.quantidadeMaxima}...`);
    }
  }

  // Função chamada sempre que o usuário altera o número máximo
  onQuantidadeMaximaChange() {
    // Se a quantidade atual for maior que o novo máximo, ajusta para o máximo
    if (this.quantidadeNumeros && this.quantidadeMaxima && this.quantidadeNumeros > this.quantidadeMaxima) {
      this.quantidadeNumeros = this.quantidadeMaxima;
    }
  }
}
