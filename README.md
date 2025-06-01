# Números da Sorte 🎲

Uma aplicação web moderna desenvolvida com Angular 17 para gerar números aleatórios únicos. Perfeita para jogos de loteria, sorteios ou qualquer situação que necessite de números aleatórios não repetidos.

## ✨ Funcionalidades

- 🔢 Geração de números aleatórios únicos
- 📊 Exibição dos números em ordem crescente
- 📱 Interface responsiva (desktop e mobile)
- 📋 Botão de copiar números para a área de transferência
- 🎯 Validações em tempo real
- 💫 Animações e feedback visual
- 🎨 Design moderno com Material Design

## 🛠️ Tecnologias Utilizadas

- Angular 17
- Angular Material
- TypeScript
- SCSS
- RxJS

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (versão 9 ou superior)

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/numeros-da-sorte.git
cd numeros-da-sorte
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm start
```

4. Acesse a aplicação em `http://localhost:4200`

## 📦 Build para Produção

Para gerar uma versão de produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

## 💡 Como Usar

1. Digite a quantidade de números que deseja gerar
2. Informe o número máximo permitido (ex: 60 para Mega-Sena)
3. Clique em "Gerar Números"
4. Os números serão exibidos em ordem crescente
5. Use o botão "Copiar números" para copiar para a área de transferência
6. Use o botão "Limpar" para gerar novos números

## 🎯 Validações

- Quantidade deve ser maior que zero
- Número máximo deve ser maior que zero
- Quantidade não pode ser maior que o número máximo
- Campos são obrigatórios

## 🌟 Recursos Avançados

- Cache de números gerados para melhor performance
- Algoritmo Fisher-Yates para embaralhamento eficiente
- Detecção de mudanças otimizada (OnPush)
- Gerenciamento de estado reativo com Signals
- Feedback visual responsivo (SnackBar adaptativo)

## 🔄 Atualizações Futuras

- [ ] Temas claro/escuro
- [ ] Mais opções de visualização dos números
- [ ] Histórico de números gerados
- [ ] Exportação em diferentes formatos
- [ ] Mais opções de personalização

## 📱 Layout Responsivo

A aplicação se adapta automaticamente a diferentes tamanhos de tela:

- Desktop: Layout em duas colunas
- Mobile: Layout em coluna única
- Tablet: Layout adaptativo

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Agradecimentos

- Angular Team
- Material Design Team
- Todos os contribuidores

---

Desenvolvido com ❤️ e ☕
