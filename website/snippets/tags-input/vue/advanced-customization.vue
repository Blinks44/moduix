<script setup lang="ts">
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
import styles from '@/components/examples/tags-input/tags-input-advanced-customization.module.css';
</script>

<template>
  <TagsInput :class="styles.root" :default-value="['React', 'TypeScript']" name="frameworks">
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
            <TagsInputItemDeleteTrigger :aria-label="`Remove ${value}`" />
          </TagsInputItemPreview>
          <TagsInputItemInput />
        </TagsInputItem>
      </TagsInputContext>
      <TagsInputInput placeholder="Add framework" />
      <TagsInputClearTrigger aria-label="Clear frameworks" />
    </TagsInputControl>
    <TagsInputHiddenInput />
  </TagsInput>
</template>