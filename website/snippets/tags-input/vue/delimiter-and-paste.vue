<script setup lang="ts">
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/vue/tags-input';
</script>

<template>
  <TagsInput :default-value="['React', 'Solid', 'Vue']" :delimiter="/[,;\s]/" add-on-paste>
    <TagsInputLabel>Frameworks</TagsInputLabel>
    <TagsInputControl>
      <TagsInputItems />
      <TagsInputInput placeholder="Comma, semicolon, or space" />
      <TagsInputClearTrigger aria-label="Clear frameworks" />
    </TagsInputControl>
  </TagsInput>
</template>