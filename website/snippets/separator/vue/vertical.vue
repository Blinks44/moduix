<script setup lang="ts">
import { Separator } from '@moduix/vue/separator';
import styles from '@/components/examples/separator/separator-vertical.module.css';

const navigationItems = ['Home', 'Pricing', 'Sign in'];
</script>

<template>
  <nav aria-label="Main navigation" :class="styles.root">
    <a v-for="item in navigationItems.slice(0, 2)" :key="item" href="#" :class="styles.link">
      {{ item }}
    </a>
    <Separator orientation="vertical" />
    <a href="#" :class="styles.link">{{ navigationItems[2] }}</a>
  </nav>
</template>