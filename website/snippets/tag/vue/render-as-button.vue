<script setup lang="ts">
import { Tag, TagLabel } from '@moduix/vue/tag';
import styles from '@/components/examples/tag/tag-render-as-button.module.css';
</script>

<template>
  <Tag as-child variant="outline">
    <button :class="styles.buttonTag" type="button">
      <TagLabel>Open filter</TagLabel>
    </button>
  </Tag>
</template>