<script setup lang="ts">
import { Bleed } from '@moduix/vue/bleed';
import styles from '@/components/examples/bleed/bleed-custom-styling.module.css';

const content = {
  shell: 'Nested shell content stays constrained.',
  surface: 'This bleed matches the shell width instead of the viewport.',
};
</script>

<template>
  <div :class="styles.shell">
    <div :class="styles.shellContent">
      <p style="margin: 0">{{ content.shell }}</p>
      <Bleed :class="styles.customSurface">
        <p style="margin: 0">{{ content.surface }}</p>
      </Bleed>
    </div>
  </div>
</template>