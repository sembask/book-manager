<script setup lang="ts">
import { ref } from "vue";
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

const formErrors = ref<Record<string, string>>({});

const startedAtInput = ref(
  formData.value.startedAt.toISOString().substring(0, 10)
);
const finishedAtInput = ref(
  formData.value.finishedAt?.toISOString().substring(0, 10) || ""
);

watch(startedAtInput, (val) => {
  formData.value.startedAt = new Date(val);
  formErrors.value.startedAt = "";
});
watch(finishedAtInput, (val) => {
  formData.value.finishedAt = val ? new Date(val) : undefined;
  formErrors.value.finishedAt = "";
});

function handleRatingChange(rating: number) {
  formData.value.rating = rating;
  if (rating >= 1) formErrors.value.rating = "";
}

function handleSubmit(e: Event) {
  e.preventDefault();

  const result = bookUserSchema.safeParse(formData.value);
  if (!result.success) {
    const f = result.error.format();
    formErrors.value = {
      startedAt: f.startedAt?._errors?.[0] || "",
      finishedAt: f.finishedAt?._errors?.[0] || "",
      review: f.review?._errors?.[0] || "",
      rating: f.rating?._errors?.[0] || "",
    };
    return;
  }

  formErrors.value = {};
  props.onSave(result.data);
}

watch(
  () => formData.value.review,
  (val) => {
    if (val?.length >= 5) formErrors.value.review = "";
  }
);
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
              v-model="startedAtInput"
            ></Input>
            <Alert
              v-if="formErrors.startedAt"
              variant="destructive"
              class="mt-2"
            >
              <Icon
                name="lucide:alert-circle"
                class="h-5 w-5 mt-1 text-destructive"
              />
              <AlertDescription class="text-sm text-destructive">{{
                formErrors.startedAt
              }}</AlertDescription>
            </Alert>
          </div>

          <div class="space-y-2">
            <Label for="finishedAt">Data de término da leitura</Label>
            <Input
              id="finishedAt"
              name="finishedAt"
              type="date"
              v-model="finishedAtInput"
            ></Input>
            <Alert
              v-if="formErrors.finishedAt"
              variant="destructive"
              class="mt-2 flex items-start gap-2 p-3"
            >
              <Icon
                name="lucide:alert-circle"
                class="h-5 w-5 mt-1 text-destructive"
              />
              <AlertDescription class="text-sm text-destructive">
                {{ formErrors.finishedAt }}
              </AlertDescription>
            </Alert>
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
            <Alert
              v-if="formErrors.rating"
              variant="destructive"
              class="mt-2 flex items-start gap-2 p-3"
            >
              <Icon
                name="lucide:circle-alert"
                class="h-5 w-5 mt-1 text-destructive"
              />
              <AlertDescription class="text-sm text-destructive">{{
                formErrors.rating
              }}</AlertDescription>
            </Alert>
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
          <Alert
            v-if="formErrors.review"
            variant="destructive"
            class="mt-2 flex items-start gap-2 p-3"
          >
            <Icon
              name="lucide:circle-alert"
              class="h-5 w-5 mt-1 text-destructive"
            />
            <AlertDescription class="text-sm text-destructive">{{
              formErrors.review
            }}</AlertDescription>
          </Alert>
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
