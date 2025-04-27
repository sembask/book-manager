import type { Book } from "~/models/book";

interface ApiGoogleBooksResponse {
  items: {
    id: string;
    volumeInfo: {
      title: string;
      authors: string[];
      imageLinks: {
        thumbnail: string;
      };
    };
  }[];
}

export async function searchBooks(query: string): Promise<Book[]> {
  const response = await $fetch<ApiGoogleBooksResponse>(
    "https://www.googleapis.com/books/v1/volumes",
    {
      params: { q: query },
    }
  );
  return (response.items || []).map((item: any) => ({
    id: item.id,
    apiBookId: item.id,
    title: item.volumeInfo.title,
    authors: item.volumeInfo.authors || [],
    thumbnail: item.volumeInfo.imageLinks?.thumbnail,
    pageCount: item.volumeInfo.pageCount,
  }));
}
