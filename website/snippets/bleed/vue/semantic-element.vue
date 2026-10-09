<script setup lang="ts">
import { Bleed } from '@moduix/vue/bleed';
import styles from '@/components/examples/bleed/bleed-semantic-element.module.css';

const caption = 'Full-width media with a constrained parent.';
</script>

<template>
  <div :class="styles.root">
    <Bleed as-child :class="styles.figure">
      <figure>
        <div :class="styles.media" />
        <p style="margin: 0">{{ caption }}</p>
      </figure>
    </Bleed>
  </div>
</template>