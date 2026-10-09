<script setup lang="ts">
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/vue/tags-input';
import styles from '@/components/examples/tags-input/tags-input-sanitize-and-blur.module.css';

const sanitizeValue = (value: string) => value.trim().toLowerCase();
</script>

<template>
  <TagsInput
    :class="styles.root"
    blur-behavior="add"
    :default-value="['design']"
    :sanitize-value="sanitizeValue"
  >
    <TagsInputLabel>Topics</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Blur to add" />
      <TagsInputClearTrigger aria-label="Clear topics" />
    </TagsInputControl>
  </TagsInput>
</template>