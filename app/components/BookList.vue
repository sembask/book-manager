<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import type { Book } from "@/models/book";

type BookListProps = {
  books: Book[];
  onSelect: (book: Book) => void;
};

const props = defineProps<BookListProps>();
</script>

<template>
  <Card
    v-for="book in props.books"
    :key="book.apiBookId"
    @click="() => props.onSelect(book)"
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
        <CardTitle>{{ book.title }}</CardTitle>
        <CardDescription>{{ book.authors.join(", ") }}</CardDescription>
        <p v-if="book.pageCount">{{ book.pageCount }} páginas</p>
        <p v-else>Número de páginas indefinido</p>
      </div>
    </CardContent>
  </Card>
</template>
