<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/vue/tags-input';
import styles from '@/components/examples/tags-input/tags-input-disabled-and-read-only.module.css';
</script>

<template>
  <Stack :class="styles.root">
    <TagsInput disabled :default-value="['disabled']">
      <TagsInputLabel>Disabled</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Unavailable" />
      </TagsInputControl>
    </TagsInput>

    <TagsInput read-only :default-value="['read-only']">
      <TagsInputLabel>Read-only</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Read-only" />
        <TagsInputClearTrigger aria-label="Clear read-only tags" />
      </TagsInputControl>
    </TagsInput>
  </Stack>
</template>