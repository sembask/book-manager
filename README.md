# Book Manager

Aplicação web para gerenciar leituras de livros, desenvolvida com Nuxt 3, TailwindCSS, ShadCN UI e Zod. Permite adicionar, listar, avaliar e excluir livros, com persistência local via `localStorage`.

## Tecnologias Utilizadas

- Nuxt 3
- TailwindCSS 4
- ShadCN UI
- Zod

- Armazenamento: localStorage (sem banco de dados)

## Como Executar

1. Clone o repositório
   git clone https://github.com/sembask/book-manager.git
   cd book-manager

2. Instale as dependências
   npm install

3. Inicie o servidor de desenvolvimento
   npm run dev

4. Acesse em
   http://localhost:3000

## Funcionalidades

- Buscar livros via API do Google Books
- Adicionar livro à lista com avaliação, data de leitura e opinião
- Validação com Zod
- Exibição com ordenação por data de início (mais antiga primeiro)
- Persistência local com localStorage

---

Este projeto foi desenvolvido para fins de teste técnico.
