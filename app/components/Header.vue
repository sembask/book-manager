<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <header class="flex items-center h-20">
    <div class="flex justify-between container mx-auto">
      <NuxtLink to="/">
        <div class="flex gap-4 items-center">
          <Icon name="lucide:book-open" size="28"></Icon>
          <h1 class="text-2xl font-bold">Book Manager</h1>
        </div>
      </NuxtLink>
      <Button @click="router.push('/cadastro')" class="cursor-pointer"
        ><Icon name="lucide:circle-plus" />Adicionar Livro</Button
      >
    </div>
  </header>
</template>
