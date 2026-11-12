<script setup lang="ts">
import { Bleed } from '@moduix/vue/bleed';
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/bleed/bleed-custom-styling.module.css';

const content = {
  shell: 'Nested shell content stays constrained.',
  surface: 'This bleed matches the shell width instead of the viewport.',
};
</script>

<template>
  <div :class="styles.shell">
    <div :class="styles.shellContent">
      <Text tone="muted">{{ content.shell }}</Text>
      <Bleed :class="styles.customSurface">
        <Text weight="semibold">{{ content.surface }}</Text>
      </Bleed>
    </div>
  </div>
</template>