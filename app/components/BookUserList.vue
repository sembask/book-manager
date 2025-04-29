<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import type { BookUser } from "@/models/bookUser";

type BookUserListProps = {
  books: BookUser[];
  onDelete: (book: BookUser) => void | Promise<void>;
};
const props = defineProps<BookUserListProps>();

const sortedBooks = computed(() =>
  [...props.books].sort((a, b) => {
    return new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime();
  })
);
</script>

<template>
  <Card v-for="book in sortedBooks" :key="book.id" class="mb-6">
    <CardContent class="flex gap-4 items-start">
      <div class="shrink-0">
        <img
          :src="book.thumbnail || '/placeholder.svg'"
          :alt="book.title"
          width="60"
          height="90"
          class="object-cover rounded-sm w-24"
        />
      </div>
      <div class="flex flex-col gap-1">
        <CardTitle class="text-base">{{ book.title }}</CardTitle>
        <CardDescription class="text-sm text-muted-foreground">
          {{ book.authors.join(", ") }}
        </CardDescription>
        <p class="text-sm" v-if="book.pageCount">
          {{ book.pageCount }} páginas
        </p>
        <p class="text-sm" v-else>Número de páginas indefinido</p>
        <p class="text-sm" v-if="book.startedAt">
          <strong>Início:</strong>
          {{
            new Date(book.startedAt).toLocaleDateString("pt-BR", {
              timeZone: "UTC",
            })
          }}
        </p>
        <p class="text-sm" v-if="book.finishedAt">
          <strong>Término:</strong>
          {{
            new Date(book.finishedAt).toLocaleDateString("pt-BR", {
              timeZone: "UTC",
            })
          }}
        </p>
        <div class="flex items-center gap-1" v-if="book.rating">
          <strong>Avaliação:</strong>
          <Icon
            v-for="star in 5"
            name="material-symbols:kid-star"
            class="h-6 w-6"
            :class="
              book.rating >= star
                ? 'fill-primary text-primary'
                : 'text-muted-foreground'
            "
          />
        </div>
        <p class="text-sm" v-if="book.review">
          <strong>Opinião:</strong> {{ book.review }}
        </p>
      </div>
    </CardContent>
    <CardFooter>
      <Button
        @click="props.onDelete(book)"
        variant="destructive"
        size="sm"
        class=""
      >
        <Icon name="lucide:trash" />Excluir</Button
      >
    </CardFooter>
  </Card>
</template>
