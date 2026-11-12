<script setup lang="ts">
import { Bleed } from '@moduix/vue/bleed';
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/bleed/bleed-semantic-element.module.css';

const caption = 'Full-width media with a constrained parent.';
</script>

<template>
  <div :class="styles.root">
    <Bleed as-child :class="styles.figure">
      <figure>
        <div :class="styles.media" />
        <Text tone="muted" size="sm">{{ caption }}</Text>
      </figure>
    </Bleed>
  </div>
</template>