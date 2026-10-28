<script setup lang="ts">
import { Separator } from '@moduix/vue/separator';
import styles from '@/components/examples/separator/separator-vertical.module.css';

const navigationItems = [
  { href: '#home', label: 'Home' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#sign-in', label: 'Sign in' },
];
</script>

<template>
  <nav aria-label="Main navigation" :class="styles.root">
    <a
      v-for="item in navigationItems.slice(0, 2)"
      :key="item.href"
      :href="item.href"
      :class="styles.link"
    >
      {{ item.label }}
    </a>
    <Separator orientation="vertical" />
    <a :href="navigationItems[2].href" :class="styles.link">{{ navigationItems[2].label }}</a>
  </nav>
</template>