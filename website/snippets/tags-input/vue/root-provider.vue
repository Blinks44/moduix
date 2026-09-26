<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Stack } from '@moduix/vue/stack';
import {
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
  TagsInputRootProvider,
  useTagsInput,
} from '@moduix/vue/tags-input';
import { useId } from 'vue';
import styles from '@/components/examples/tags-input/tags-input-root-provider.module.css';

const tagsInput = useTagsInput({
  id: useId(),
  defaultValue: ['React'],
});
</script>

<template>
  <Stack :class="styles.root">
    <TagsInputRootProvider :value="tagsInput">
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add framework" />
        <TagsInputClearTrigger aria-label="Clear frameworks" />
      </TagsInputControl>
    </TagsInputRootProvider>
    <output>Tags: {{ tagsInput.value.join(', ') || 'empty' }}</output>
    <Button type="button" size="sm" @click="tagsInput.addValue('Solid')">Add Solid</Button>
    <Button type="button" size="sm" variant="outline" @click="tagsInput.clearValue()">
      Clear
    </Button>
    <Button type="button" size="sm" variant="outline" @click="tagsInput.focus()">Focus</Button>
  </Stack>
</template>