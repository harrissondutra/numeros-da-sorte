import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumerosService {
  constructor() { }

  /**
   * Gera uma lista de números aleatórios únicos
   * @param quantidade Quantidade de números a serem gerados
   * @param maximo Número máximo permitido (inclusive)
   * @returns Array com os números gerados, ordenados crescentemente
   */
  gerarNumerosAleatorios(quantidade: number, maximo: number): number[] {
    // Validações
    if (quantidade <= 0 || maximo <= 0) {
      throw new Error('Quantidade e máximo devem ser maiores que zero');
    }

    if (quantidade > maximo) {
      throw new Error('A quantidade não pode ser maior que o número máximo');
    }

    // Cria um Set para garantir números únicos
    const numerosGerados = new Set<number>();

    // Gera números até atingir a quantidade desejada
    while (numerosGerados.size < quantidade) {
      // Gera um número aleatório entre 1 e máximo (inclusive)
      const numero = Math.floor(Math.random() * maximo) + 1;
      numerosGerados.add(numero);
    }

    // Converte o Set para Array e ordena
    return Array.from(numerosGerados).sort((a, b) => a - b);
  }
} 