<script setup lang="ts">
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/input/input-disabled-and-readonly.module.css';
</script>

<template>
  <div :class="styles.root">
    <Input disabled aria-label="Disabled input" placeholder="Disabled input" />
    <Input read-only aria-label="Read-only workspace" value="Assigned workspace" />
  </div>
</template>