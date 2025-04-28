<script lang="ts" setup>
import { ref, watch } from "vue";
import { useBooks } from "~/composables/useBooks";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";

import type { Book } from "~/models/book";
import { useRouter } from "vue-router";

const router = useRouter();
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

      <Card
        v-for="book in books"
        @click="selectBook(book)"
        :key="book.apiBookId"
        class="mb-6 cursor-pointer hover:bg-accent transition-colors"
      >
        <CardContent class="flex gap-4 items-center">
          <div class="shrink-0">
            <img
              :src="book.thumbnail"
              alt="Capa do Livro"
              v-if="book.thumbnail"
              width="60"
              height="90"
              class="object-cover rounded-sm w-24"
            />
          </div>
          <div class="flex flex-col">
            <CardTitle> {{ book.title }} </CardTitle>
            <CardDescription>{{ book.authors.join(", ") }}</CardDescription>
            <p v-if="book.pageCount">{{ book.pageCount }} páginas</p>
            <p v-else>número de páginas idenfinido</p>
          </div>
        </CardContent>
      </Card>
    </div>
    <div v-if="onRegister && bookSelected">
      <BookFormRegister
        :book="bookSelected"
        :onSave="registerBooks"
        :onCancel="() => router.push('/')"
      >
      </BookFormRegister>
    </div>
  </div>
</template>
