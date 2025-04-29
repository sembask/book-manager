<script lang="ts" setup>
import type { Book } from "~/models/book";
import type { BookUser } from "~/models/bookUser";

const { deleteBooks } = useBooks();

const userBooksData = ref<BookUser[]>([]);

const mappedBooks = computed<Book[]>(() =>
  userBooksData.value.map((bookUser) => ({
    apiBookId: bookUser.apiBookId,
    title: bookUser.title,
    authors: bookUser.authors,
    thumbnail: bookUser.thumbnail,
    pageCount: bookUser.pageCount,
  }))
);

function handleDelete(book: BookUser) {
  const updatedBooks = (userBooksData.value = userBooksData.value.filter(
    (b) => b.apiBookId !== book.apiBookId
  ));
  deleteBooks(updatedBooks);
}

const isMounted = ref(false);
onMounted(() => {
  const saved = localStorage.getItem("savedBooks");

  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      userBooksData.value = parsed as BookUser[];
    } catch (error) {
      console.error("Erro ao carregar livros salvos:", error);
    }
  }
  isMounted.value = true;
});
</script>

<template>
  <div v-if="isMounted" class="container mx-auto">
    <div v-if="mappedBooks.length === 0" class="text-center container">
      <span>
        Nenhum livro ainda
        <p></p>
        Adicione livros para começar a acompanhar suas leituras
      </span>
    </div>
    <div v-else>
      <h1 class="text-2xl font-medium mb-6">Meus livros</h1>
      <BookUserList
        :books="userBooksData"
        :onDelete="handleDelete"
      ></BookUserList>
    </div>
  </div>
</template>
