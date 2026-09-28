<script setup lang="ts">
import { Marquee, MarqueeContent, MarqueeItem, MarqueeViewport } from '@moduix/vue/marquee';
import { ref } from 'vue';
import styles from '@/components/examples/marquee/marquee-finite-loops.module.css';

const partners = [
  { name: 'Atlas', mark: 'AT' },
  { name: 'Beacon', mark: 'BC' },
  { name: 'Compass', mark: 'CP' },
  { name: 'Delta', mark: 'DL' },
  { name: 'Echo', mark: 'EC' },
  { name: 'Foundry', mark: 'FD' },
];

const loops = ref(0);
const completed = ref(0);
const handleLoopComplete = () => loops.value++;
const handleComplete = () => completed.value++;
</script>

<template>
  <div :class="styles.stack">
    <Marquee
      aria-label="Partner logos"
      :loop-count="3"
      :class="styles.root"
      @loop-complete="handleLoopComplete"
      @complete="handleComplete"
    >
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem v-for="item in partners" :key="item.name" :class="styles.item">
            <span>{{ item.mark }}</span>
            <span>{{ item.name }}</span>
          </MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
    </Marquee>
    <div :class="styles.status">
      <span>Loops: {{ loops }}</span>
      <span>Completed: {{ completed }}</span>
    </div>
  </div>
</template>