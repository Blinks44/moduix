<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { Tag, TagCloseTrigger, TagEndElement, TagLabel } from '@moduix/vue/tag';
import { ref } from 'vue';

type TagVariant = 'default' | 'secondary' | 'outline';
type DemoTag = {
  label: string;
  variant: TagVariant;
  disabled?: boolean;
};

const tags: DemoTag[] = [
  { label: 'TypeScript', variant: 'default' },
  { label: 'Design review', variant: 'secondary' },
  { label: 'Needs approval', variant: 'outline', disabled: true },
];
const visibleTags = ref(tags);

const removeTag = (label: string) => {
  visibleTags.value = visibleTags.value.filter((tag) => tag.label !== label);
};
</script>

<template>
  <Stack direction="row" align="center" wrap="wrap" gap="3">
    <Tag v-for="tag in visibleTags" :key="tag.label" :variant="tag.variant">
      <TagLabel>{{ tag.label }}</TagLabel>
      <TagEndElement>
        <TagCloseTrigger
          :disabled="tag.disabled"
          :aria-label="`Remove ${tag.label} tag`"
          @click="removeTag(tag.label)"
        />
      </TagEndElement>
    </Tag>
  </Stack>
</template>