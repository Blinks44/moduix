<script setup lang="ts">
import { Bleed } from '@moduix/vue/bleed';
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/bleed/bleed-block-bleed.module.css';

const content = {
  before: 'Container padding above.',
  surface: 'Inline and block bleed',
  after: 'Container padding below.',
};
</script>

<template>
  <div :class="styles.root">
    <Text tone="muted">{{ content.before }}</Text>
    <Bleed inline="md" block="md" :class="styles.panel">
      <Text>{{ content.surface }}</Text>
    </Bleed>
    <Text tone="muted">{{ content.after }}</Text>
  </div>
</template>