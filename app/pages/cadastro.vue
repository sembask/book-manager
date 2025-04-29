<script lang="ts" setup>
import type { Book } from "~/models/book";

const searchQuery = ref("");
const onRegister = ref(false);
const bookSelected = ref<Book | null>(null);

const { books, isLoading, fetchBooks, registerBooks } = useBooks();

function selectBook(p: Book) {
  onRegister.value = true;
  bookSelected.value = p;
}

function handleManualSearch(searchQuery: string) {
  clearTimeout(debounceTimer);
  fetchBooks(searchQuery);
}

function handleCancel() {
  onRegister.value = false;
  bookSelected.value = null;
}

let debounceTimer: ReturnType<typeof setTimeout>;

watch(searchQuery, (newValue) => {
  clearTimeout(debounceTimer);

  if (newValue.trim().length > 2) {
    debounceTimer = setTimeout(() => {
      fetchBooks(newValue);
    }, 400);
  } else {
    books.value = [];
  }
});
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-medium mb-6">Adicionar livro</h1>
    <div v-if="!onRegister" class="flex gap-4 relative">
      <Icon
        name="lucide:search"
        size="24"
        class="left-2 top-2 absolute text-muted-foreground"
      />
      <Input
        class="shadow-inherit pl-10"
        v-model="searchQuery"
        placeholder="Digite o nome do livro"
      >
      </Input>
      <Button
        @click="handleManualSearch(searchQuery)"
        :disabled="searchQuery.trim() === ''"
        >Buscar</Button
      >
    </div>
    <div v-if="isLoading" class="mt-6 text-lg font-medium mb-6">
      Buscando Livro...
    </div>

    <div v-else-if="!onRegister" class="mt-6">
      <span v-if="books.length > 0" class="block text-lg font-medium mb-6"
        >Livros encontrados</span
      >
      <BookList :books="books" :onSelect="selectBook" />
    </div>
    <div v-if="onRegister && bookSelected">
      <BookFormRegister
        :book="bookSelected"
        :onSave="registerBooks"
        :onCancel="handleCancel"
      >
      </BookFormRegister>
    </div>
  </div>
</template>
