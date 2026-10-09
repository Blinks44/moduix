<script setup lang="ts">
import { Separator } from '@moduix/vue/separator';
import styles from '@/components/examples/separator/separator-basic.module.css';

const sections = ['Account settings', 'Billing details'];
</script>

<template>
  <div :class="styles.root">
    <div :class="styles.stack">
      <span>{{ sections[0] }}</span>
      <Separator />
      <span>{{ sections[1] }}</span>
    </div>
  </div>
</template>