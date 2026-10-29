<script setup lang="ts">
import { X as XIcon } from '@lucide/vue';
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputContext,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDeleteTrigger,
  TagsInputItemInput,
  TagsInputItemPreview,
  TagsInputItemText,
  TagsInputLabel,
} from '@moduix/vue/tags-input';

const initialTags = ['React', 'TypeScript'];
</script>

<template>
  <TagsInput :default-value="initialTags" name="frameworks">
    <TagsInputLabel>Frameworks</TagsInputLabel>
    <TagsInputControl>
      <TagsInputContext v-slot="tagsInput">
        <TagsInputItem
          v-for="(value, index) in tagsInput.value"
          :key="`${value}-${index}`"
          :index="index"
          :value="value"
        >
          <TagsInputItemPreview>
            <TagsInputItemText>{{ value }}</TagsInputItemText>
            <TagsInputItemDeleteTrigger><XIcon :stroke-width="3" /></TagsInputItemDeleteTrigger>
          </TagsInputItemPreview>
          <TagsInputItemInput />
        </TagsInputItem>
      </TagsInputContext>
      <TagsInputInput placeholder="Add framework" />
      <TagsInputClearTrigger aria-label="Clear frameworks">
        <XIcon :stroke-width="3" />
      </TagsInputClearTrigger>
    </TagsInputControl>
    <TagsInputHiddenInput />
  </TagsInput>
</template>