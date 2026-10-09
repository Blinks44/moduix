<script setup lang="ts">
import { Bleed } from '@moduix/vue/bleed';
import styles from '@/components/examples/bleed/bleed-block-bleed.module.css';

const content = {
  before: 'Container padding above.',
  surface: 'Inline and block bleed',
  after: 'Container padding below.',
};
</script>

<template>
  <div :class="styles.root">
    <p
      style="margin: 0; color: var(--moduix-text-muted-color, var(--moduix-color-muted-foreground))"
    >
      {{ content.before }}
    </p>
    <Bleed inline="md" block="md" :class="styles.panel">
      <p style="margin: 0">{{ content.surface }}</p>
    </Bleed>
    <p
      style="margin: 0; color: var(--moduix-text-muted-color, var(--moduix-color-muted-foreground))"
    >
      {{ content.after }}
    </p>
  </div>
</template>