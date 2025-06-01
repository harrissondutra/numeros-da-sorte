import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumerosService {
  // Cache para números já gerados
  private cache = new Map<string, number[]>();

  /**
   * Gera uma lista de números aleatórios únicos
   * @param quantidade Quantidade de números a serem gerados
   * @param maximo Número máximo que pode ser gerado
   * @returns Array de números aleatórios únicos
   */
  gerarNumerosAleatorios(quantidade: number, maximo: number): number[] {
    // Validações
    this.validarParametros(quantidade, maximo);

    // Chave para o cache
    const cacheKey = `${quantidade}-${maximo}`;

    // Verifica se já existe no cache
    const cachedResult = this.cache.get(cacheKey);
    if (cachedResult) {
      // Retorna uma cópia do array para evitar mutações
      return [...cachedResult];
    }

    // Gera os números
    const numeros = this.gerarNumeros(quantidade, maximo);

    // Armazena no cache
    this.cache.set(cacheKey, [...numeros]);

    return numeros;
  }

  /**
   * Valida os parâmetros de entrada
   * @param quantidade Quantidade de números a serem gerados
   * @param maximo Número máximo que pode ser gerado
   */
  private validarParametros(quantidade: number, maximo: number): void {
    if (!Number.isInteger(quantidade) || quantidade < 1) {
      throw new Error('A quantidade deve ser um número inteiro maior que zero');
    }

    if (!Number.isInteger(maximo) || maximo < 1) {
      throw new Error('O número máximo deve ser um número inteiro maior que zero');
    }

    if (quantidade > maximo) {
      throw new Error('A quantidade não pode ser maior que o número máximo');
    }
  }

  /**
   * Gera os números aleatórios usando o algoritmo Fisher-Yates
   * @param quantidade Quantidade de números a serem gerados
   * @param maximo Número máximo que pode ser gerado
   * @returns Array de números aleatórios únicos
   */
  private gerarNumeros(quantidade: number, maximo: number): number[] {
    // Cria um array com todos os números possíveis
    const numeros = Array.from({ length: maximo }, (_, i) => i + 1);

    // Embaralha o array usando o algoritmo Fisher-Yates
    for (let i = numeros.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
    }

    // Retorna apenas a quantidade solicitada
    return numeros.slice(0, quantidade);
  }

  /**
   * Limpa o cache de números gerados
   */
  limparCache(): void {
    this.cache.clear();
  }
} 