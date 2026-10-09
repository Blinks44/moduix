<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  MarqueeContent,
  MarqueeItem,
  MarqueeRootProvider,
  MarqueeViewport,
  useMarquee,
} from '@moduix/vue/marquee';
import { ref } from 'vue';
import styles from '@/components/examples/marquee/marquee-programmatic-control.module.css';

const partners = [
  { name: 'Atlas', mark: 'AT' },
  { name: 'Beacon', mark: 'BC' },
  { name: 'Compass', mark: 'CP' },
  { name: 'Delta', mark: 'DL' },
  { name: 'Echo', mark: 'EC' },
  { name: 'Foundry', mark: 'FD' },
];

const marquee = useMarquee({ translations: { root: 'Partner logos' } });
const status = ref('Running');

const handlePause = () => {
  marquee.value.pause();
  status.value = 'Paused';
};

const handleResume = () => {
  marquee.value.resume();
  status.value = 'Running';
};

const handleRestart = () => {
  marquee.value.restart();
  status.value = 'Restarted';
};
</script>

<template>
  <div :class="styles.stack">
    <MarqueeRootProvider :value="marquee" :class="styles.root">
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem v-for="item in partners" :key="item.name" :class="styles.item">
            <span>{{ item.mark }}</span>
            <span>{{ item.name }}</span>
          </MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
    </MarqueeRootProvider>
    <div>
      <output>Playback: {{ status }}</output>
      <Button size="sm" variant="outline" @click="handlePause">Pause</Button>
      <Button size="sm" variant="outline" @click="handleResume">Resume</Button>
      <Button size="sm" variant="outline" @click="handleRestart">Restart</Button>
    </div>
  </div>
</template>