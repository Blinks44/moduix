<script setup lang="ts">
import { Marquee, MarqueeContent, MarqueeItem, MarqueeViewport } from '@moduix/vue/marquee';
import styles from '@/components/examples/marquee/marquee-auto-fill.module.css';

const partners = [
  { name: 'Atlas', mark: 'AT' },
  { name: 'Beacon', mark: 'BC' },
  { name: 'Compass', mark: 'CP' },
  { name: 'Delta', mark: 'DL' },
  { name: 'Echo', mark: 'EC' },
  { name: 'Foundry', mark: 'FD' },
];
</script>

<template>
  <Marquee aria-label="Partner logos" auto-fill spacing="2rem" :class="styles.root">
    <MarqueeViewport>
      <MarqueeContent>
        <MarqueeItem v-for="item in partners" :key="item.name" :class="styles.item">
          <span>{{ item.mark }}</span>
          <span>{{ item.name }}</span>
        </MarqueeItem>
      </MarqueeContent>
    </MarqueeViewport>
  </Marquee>
</template>