<script setup lang="ts">
import { Tag, TagLabel } from '@moduix/vue/tag';
</script>

<template>
  <Tag as-child variant="outline">
    <button type="button">
      <TagLabel>Open filter</TagLabel>
    </button>
  </Tag>
</template>