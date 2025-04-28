import { z } from "zod";

export const bookUserSchema = z
  .object({
    apiBookId: z.string(),
    title: z.string(),
    authors: z.array(z.string()),
    thumbnail: z.string().default("/placeholder.svg"),
    pageCount: z.number().optional(),

    id: z.string(),
    startedAt: z.date(),
    finishedAt: z.date().optional(),
    rating: z
      .number()
      .min(1, "Avaliação mínima é 1 estrela")
      .max(5, "Avaliação máxima é 5 estrelas"),
    review: z.string().min(5, "Escreva pelo menos 5 caracteres de opinião"),
  })
  .refine(
    (data) => {
      if (data.finishedAt && data.startedAt) {
        return data.finishedAt >= data.startedAt;
      }
      return true;
    },
    {
      path: ["finishedAt"],
      message: "A data de término deve ser igual ou posterior à data de início",
    }
  );

export type BookUserSchema = z.infer<typeof bookUserSchema>;
