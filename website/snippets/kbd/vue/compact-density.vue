<script setup lang="ts">
import { Kbd } from '@moduix/vue/kbd';
import styles from '@/components/examples/kbd/kbd-compact-density.module.css';

const keys = ['Esc', 'Ctrl', '/'];
</script>

<template>
  <div :class="styles.root">
    <Kbd v-for="key in keys" :key="key" :class="styles.dense">{{ key }}</Kbd>
  </div>
</template>