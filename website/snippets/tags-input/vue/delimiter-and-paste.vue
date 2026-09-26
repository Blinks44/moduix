<script setup lang="ts">
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/vue/tags-input';
import styles from '@/components/examples/tags-input/tags-input-delimiter-and-paste.module.css';
</script>

<template>
  <TagsInput
    :class="styles.root"
    :default-value="['React', 'Solid', 'Vue']"
    :delimiter="/[,;\s]/"
    add-on-paste
  >
    <TagsInputLabel>Frameworks</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Comma, semicolon, or space" />
      <TagsInputClearTrigger aria-label="Clear frameworks" />
    </TagsInputControl>
  </TagsInput>
</template>