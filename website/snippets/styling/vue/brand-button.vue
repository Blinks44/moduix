<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import styles from '@/components/examples/styling/brand-button.module.css';
</script>

<template>
  <Button :class="styles.brand"><slot /></Button>
</template>