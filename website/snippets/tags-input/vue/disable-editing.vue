<script setup lang="ts">
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/vue/tags-input';
import styles from '@/components/examples/tags-input/tags-input-disable-editing.module.css';
</script>

<template>
  <TagsInput :class="styles.root" :editable="false" :default-value="['React', 'TypeScript']">
    <TagsInputLabel>Frameworks</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Add framework" />
      <TagsInputClearTrigger aria-label="Clear frameworks" />
    </TagsInputControl>
  </TagsInput>
</template>