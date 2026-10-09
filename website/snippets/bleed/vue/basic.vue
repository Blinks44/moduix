<script setup lang="ts">
import { Bleed } from '@moduix/vue/bleed';
import styles from '@/components/examples/bleed/bleed-basic.module.css';

const content = {
  before: 'Container content stays constrained.',
  surface: 'This block bleeds to the viewport edges.',
  after: 'Following content returns to the container width.',
};
</script>

<template>
  <div :class="styles.root">
    <p style="margin: 0">{{ content.before }}</p>
    <Bleed :class="styles.surface">
      <p style="margin: 0">{{ content.surface }}</p>
    </Bleed>
    <p style="margin: 0">{{ content.after }}</p>
  </div>
</template>