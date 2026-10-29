<script setup lang="ts">
import { Separator } from '@moduix/vue/separator';
import { Stack } from '@moduix/vue/stack';
import styles from '@/components/examples/separator/separator-basic.module.css';

const sections = ['Account settings', 'Billing details'];
</script>

<template>
  <div :class="styles.root">
    <Stack gap="4">
      <span>{{ sections[0] }}</span>
      <Separator />
      <span>{{ sections[1] }}</span>
    </Stack>
  </div>
</template>