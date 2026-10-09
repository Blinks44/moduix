<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@moduix/vue/toggle-group';
</script>

<template>
  <ToggleGroup multiple :default-value="['bold', 'italic']" aria-label="Text formatting" size="md">
    <ToggleGroupItem value="bold" aria-label="Bold"><strong>B</strong></ToggleGroupItem>
    <ToggleGroupItem value="italic" aria-label="Italic"><em>I</em></ToggleGroupItem>
    <ToggleGroupItem value="underline" aria-label="Underline"><u>U</u></ToggleGroupItem>
  </ToggleGroup>
</template>