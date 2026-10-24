<script setup lang="ts">
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/vue/tags-input';

const sanitizeValue = (value: string) => value.trim().toLowerCase();
</script>

<template>
  <TagsInput blur-behavior="add" :default-value="['design']" :sanitize-value="sanitizeValue">
    <TagsInputLabel>Topics</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Blur to add" />
      <TagsInputClearTrigger aria-label="Clear topics" />
    </TagsInputControl>
  </TagsInput>
</template>