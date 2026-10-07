<script setup lang="ts">
import { Card, CardBackground, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import styles from './parallax-card.module.css';
const handlePointerMove = (event: PointerEvent) => {
  if (!(event.currentTarget instanceof HTMLElement)) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  event.currentTarget.style.setProperty('--parallax-rotate-x', `${-y * 10}deg`);
  event.currentTarget.style.setProperty('--parallax-rotate-y', `${x * 10}deg`);
};
const handlePointerLeave = (event: PointerEvent) => {
  if (!(event.currentTarget instanceof HTMLElement)) return;
  event.currentTarget.style.removeProperty('--parallax-rotate-x');
  event.currentTarget.style.removeProperty('--parallax-rotate-y');
};
</script>
<template>
  <div :class="styles.tilt" @pointermove="handlePointerMove" @pointerleave="handlePointerLeave">
    <Card :class="styles.card" variant="elevated">
      <CardBackground
        ><img
          :class="styles.image"
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85"
          alt="" />
        <div aria-hidden="true" :class="styles.overlay"
      /></CardBackground>
      <CardHeader :class="styles.header"
        ><span :class="styles.eyebrow">Weekend guide</span
        ><CardTitle :class="styles.title">A quieter way to travel</CardTitle
        ><CardDescription :class="styles.description"
          >Three places to slow down, look around, and stay a little longer.</CardDescription
        ></CardHeader
      >
    </Card>
  </div>
</template>