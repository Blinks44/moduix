<script setup lang="ts">
import { Check as CheckIcon } from '@lucide/vue';
import { Stack } from '@moduix/vue/stack';
import { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement } from '@moduix/vue/tag';

const tags = [
  { label: 'Selected', variant: 'default', removable: false },
  { label: 'Deployed', variant: 'outline', removable: true },
] as const;
</script>

<template>
  <Stack direction="row" align="center" wrap="wrap" gap="3">
    <Tag v-for="tag in tags" :key="tag.label" :variant="tag.variant">
      <TagStartElement><CheckIcon /></TagStartElement>
      <TagLabel>{{ tag.label }}</TagLabel>
      <TagEndElement v-if="tag.removable">
        <TagCloseTrigger :aria-label="`Remove ${tag.label} tag`" />
      </TagEndElement>
    </Tag>
  </Stack>
</template>