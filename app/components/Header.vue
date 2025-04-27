<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

<template>
  <header class="h-20 flex items-center">
    <div class="container flex justify-between mx-auto">
      <div class="flex gap-4 items-center">
        <Icon name="lucide:book-open" size="28"></Icon>
        <h1 class="text-2xl font-bold">Book Manager</h1>
      </div>
      <Button class="bg-primary"
        ><Icon name="lucide:circle-plus" />Adicionar Livro</Button
      >
    </div>
  </header>
</template>
