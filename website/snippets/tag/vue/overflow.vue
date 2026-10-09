<script setup lang="ts">
import { Tag, TagCloseTrigger, TagEndElement, TagLabel } from '@moduix/vue/tag';
import styles from '@/components/examples/tag/tag-overflow.module.css';

const label = 'Ready for stakeholder review after legal approval';
</script>

<template>
  <Tag :class="styles.constrained">
    <TagLabel :title="label">{{ label }}</TagLabel>
    <TagEndElement>
      <TagCloseTrigger aria-label="Remove long tag" />
    </TagEndElement>
  </Tag>
</template>