<script setup lang="ts">
import { Check as CheckIcon } from '@lucide/vue';
import { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement } from '@moduix/vue/tag';
import styles from '@/components/examples/tag/tag-icon.module.css';

const tags = [
  { label: 'Selected', variant: 'default', removable: false },
  { label: 'Deployed', variant: 'outline', removable: true },
] as const;
</script>

<template>
  <div :class="styles.row">
    <Tag v-for="tag in tags" :key="tag.label" :variant="tag.variant">
      <TagStartElement><CheckIcon /></TagStartElement>
      <TagLabel>{{ tag.label }}</TagLabel>
      <TagEndElement v-if="tag.removable">
        <TagCloseTrigger :aria-label="`Remove ${tag.label} tag`" />
      </TagEndElement>
    </Tag>
  </div>
</template>