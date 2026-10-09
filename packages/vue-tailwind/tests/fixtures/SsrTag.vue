<script setup lang="ts">
import { Tag, TagStartElement, TagLabel } from '../../src/components/tag';
</script>

<template>
  <Tag as-child variant="outline">
    <button type="button">
      <TagStartElement><span aria-hidden="true">+</span></TagStartElement>
      <TagLabel>Open filters</TagLabel>
    </button>
  </Tag>
</template>