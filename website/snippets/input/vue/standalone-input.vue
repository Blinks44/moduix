<script setup lang="ts">
import { Input } from '@moduix/vue/input';
import styles from '@/components/examples/input/input-standalone-input.module.css';
</script>

<template>
  <Input :class="styles.root" aria-label="Search projects" placeholder="Search projects" />
</template>