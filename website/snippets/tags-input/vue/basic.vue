<script setup lang="ts">
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/vue/tags-input';
import styles from '@/components/examples/tags-input/tags-input-basic.module.css';

const initialTags = ['React', 'TypeScript'];
</script>

<template>
  <TagsInput :class="styles.root" :default-value="initialTags" name="frameworks">
    <TagsInputLabel>Frameworks</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Add framework" />
      <TagsInputClearTrigger aria-label="Clear frameworks" />
    </TagsInputControl>
    <TagsInputHiddenInput />
  </TagsInput>
</template>