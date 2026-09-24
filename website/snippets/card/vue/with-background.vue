<script setup lang="ts">
import { Card, CardBackground, CardDescription, CardHeader, CardTitle } from '@moduix/vue/card';
import styles from '@/components/examples/card/card-with-background.module.css';
</script>

<template>
  <Card variant="elevated" :class="styles.root">
    <CardBackground>
      <img
        alt=""
        src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85"
      />
      <div aria-hidden="true" :class="styles.overlay" />
    </CardBackground>
    <CardHeader :class="styles.header">
      <CardTitle>Weekend guide</CardTitle>
      <CardDescription :class="styles.description">
        Three places to slow down, look around, and stay a little longer.
      </CardDescription>
    </CardHeader>
  </Card>
</template>