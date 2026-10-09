<script setup lang="ts">
import { Separator } from '@moduix/vue/separator';
import styles from '@/components/examples/separator/separator-decorative.module.css';

const sections = ['Personal details', 'Notifications'];
</script>

<template>
  <div :class="styles.root">
    <div :class="styles.stack">
      <span>{{ sections[0] }}</span>
      <Separator role="presentation" />
      <span>{{ sections[1] }}</span>
    </div>
  </div>
</template>