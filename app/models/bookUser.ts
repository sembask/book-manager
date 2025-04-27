import type { Book } from "@/models/book";

export interface BookUser extends Book {
  id: string;
  startedAt: Date;
  finishedAt?: Date;
  rating: number;
  review: string;
}
