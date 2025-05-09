import { ref } from "vue";
import type { Book } from "@/models/book";
import type { BookUser } from "~/models/bookUser";
import { useRouter } from "vue-router";

interface ApiGoogleBooksResponse {
  items: {
    id: string;
    volumeInfo: {
      title: string;
      authors: string[];
      imageLinks: {
        thumbnail: string;
      };
      pageCount?: number;
    };
  }[];
}

export const useBooks = () => {
  const router = useRouter();

  const books = ref<Book[]>([]);

  const isLoading = ref(false);

  async function fetchBooks(query: string) {
    isLoading.value = true;

    try {
      const response = await $fetch<ApiGoogleBooksResponse>(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: { q: query },
        }
      );

      books.value = (response.items || []).map((item: any) => ({
        apiBookId: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        thumbnail: item.volumeInfo.imageLinks?.thumbnail,
        pageCount: item.volumeInfo.pageCount,
      }));
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    } finally {
      isLoading.value = false;
    }
  }

  async function registerBooks(book: BookUser) {
    const saved = localStorage.getItem("savedBooks");

    let books: BookUser[] = [];

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          books = parsed as BookUser[];
        }
      } catch (error) {
        console.error("Erro ao carregar livros antigos:", error);
      }
    }

    books.push(book);

    localStorage.setItem("savedBooks", JSON.stringify(books));
    router.push("/");
  }

  async function deleteBooks(book: BookUser[]) {
    try {
      localStorage.setItem("savedBooks", JSON.stringify(book));
    } catch (error) {
      console.error("Erro ao deletar o livro:", error);
    }
  }

  return {
    books,
    isLoading,
    fetchBooks,
    registerBooks,
    deleteBooks,
  } as const;
};
