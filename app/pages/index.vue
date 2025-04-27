<script lang="ts" setup>
import { searchBooks } from "~/services/bookService";

async function searchBooksPage() {
  const books = await searchBooks("Harry Potter");
  console.log("livros teste", books);
}

searchBooksPage();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] text-center"
  >
    <h1>
      Nenhum livro ainda
      <p></p>
      Adicione livros para começar a acompanhar suas leituras
    </h1>
  </div>
</template>
