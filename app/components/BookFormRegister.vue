<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type { BookUser } from "@/models/bookUser";
import type { Book } from "@/models/book";
import { bookUserSchema } from "@/schemas/bookUserSchema";

type BookFormProps = {
  book: Book;
  onSave: (book: BookUser) => void;
  onCancel: () => void;
};
const props = defineProps<BookFormProps>();

const formData = ref<BookUser>({
  ...props.book,
  id: crypto.randomUUID(),
  startedAt: new Date(),
  finishedAt: undefined,
  rating: 0,
  review: "",
});

function handleRatingChange(rating: number) {
  formData.value = { ...formData.value, rating };
}

function handleSubmit(event: Event) {
  event.preventDefault();

  const result = bookUserSchema.safeParse(formData.value);

  if (!result.success) {
    console.error(result.error.format());
    return;
  }

  props.onSave(result.data);
}

const startedAtString = ref(
  formData.value.startedAt
    ? formData.value.startedAt.toISOString().substring(0, 10)
    : ""
);

watch(startedAtString, (newValue) => {
  formData.value.startedAt = new Date(newValue || Date.now());
});

const finishedAtString = ref(
  formData.value.finishedAt
    ? formData.value.finishedAt.toISOString().substring(0, 10)
    : ""
);

watch(finishedAtString, (newValue) => {
  formData.value.finishedAt = newValue ? new Date(newValue) : undefined;
});
</script>

<template>
  <Card>
    <CardContent class="p-6">
      <div class="flex flex-col md:flex-row gap-6 mb-6">
        <div class="shrink-0 mx-auto md:mx-0">
          <img
            :src="formData?.thumbnail"
            :alt="formData.title"
            width="150"
            height="225"
            class="object-cover rounded-md"
          />
        </div>
        <div class="flex-1">
          <h2 class="text-xl font-bold mb-1">{{ formData.title }}</h2>
          <p class="text-muted-foreground mb-2">
            {{ formData.authors.join(", ") }}
          </p>
          <p class="text-sm mb-4">
            {{
              formData.pageCount
                ? `${formData.pageCount} páginas`
                : "Páginas não informadas"
            }}
          </p>
        </div>
      </div>

      <form @submit="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="startedAt">Data de início da leitura</Label>
            <Input
              id="startedAt"
              name="startedAt"
              type="date"
              v-model="startedAtString"
            ></Input>
          </div>

          <div class="space-y-2">
            <Label for="finishedAt">Data de término da leitura</Label>
            <Input
              id="finishedAt"
              name="finishedAt"
              type="date"
              v-model="finishedAtString"
            ></Input>
          </div>
        </div>

        <div class="space-y-2">
          <Label>Avaliação</Label>
          <div class="flex gap-1">
            <Button
              v-for="star in 5"
              :key="star"
              type="button"
              variant="ghost"
              size="sm"
              class="p-1 h-auto"
              @click="handleRatingChange(star)"
            >
              <Icon
                name="material-symbols:kid-star"
                class="h-6 w-6"
                :class="
                  formData.rating >= star
                    ? 'fill-primary text-primary'
                    : 'text-muted-foreground'
                "
              />
            </Button>
          </div>
        </div>

        <div class="space-y-2">
          <Label for="review">Opinião final</Label>
          <Textarea
            id="review"
            name="review"
            placeholder="Escreva sua opinião sobre o livro..."
            rows="4"
            v-model="formData.review"
          />
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" @click="props.onCancel">
            Cancelar
          </Button>
          <Button type="submit"> Salvar Livro </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
