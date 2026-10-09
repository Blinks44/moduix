<script setup lang="ts">
import { Separator } from '@moduix/vue/separator';
import styles from '@/components/examples/separator/separator-as-child.module.css';

const labels = ['Before native rule', 'After native rule'];
</script>

<template>
  <div :class="styles.root">
    <span>{{ labels[0] }}</span>
    <Separator as-child><hr /></Separator>
    <span>{{ labels[1] }}</span>
  </div>
</template>