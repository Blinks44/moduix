<script setup lang="ts">
import { Kbd } from '@moduix/vue/kbd';
import { Stack } from '@moduix/vue/stack';
import styles from '@/components/examples/kbd/kbd-compact-density.module.css';

const keys = ['Esc', 'Ctrl', '/'];
</script>

<template>
  <Stack direction="row" align="center" wrap="wrap" gap="2">
    <Kbd v-for="key in keys" :key="key" :class="styles.dense">{{ key }}</Kbd>
  </Stack>
</template>