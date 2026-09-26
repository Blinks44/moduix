<script setup lang="ts">
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/vue/tags-input';
import { ref } from 'vue';
import styles from '@/components/examples/tags-input/tags-input-controlled.module.css';

const value = ref(['React', 'TypeScript']);
</script>

<template>
  <TagsInput v-model="value" :class="styles.root">
    <TagsInputLabel>Skills</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Add skill" />
      <TagsInputClearTrigger aria-label="Clear skills" />
    </TagsInputControl>
  </TagsInput>
</template>