<script setup lang="ts">
import { LocaleProvider } from '@moduix/vue/locale';
import {
  Marquee,
  MarqueeContent,
  MarqueeEdge,
  MarqueeItem,
  MarqueeViewport,
} from '@moduix/vue/marquee';
import styles from '@/components/examples/marquee/marquee-rtl.module.css';

const partners = [
  { name: 'أطلس', mark: 'AT' },
  { name: 'بيكون', mark: 'BC' },
  { name: 'كومباس', mark: 'CP' },
  { name: 'دلتا', mark: 'DL' },
  { name: 'إيكو', mark: 'EC' },
  { name: 'فاوندري', mark: 'FD' },
];
</script>

<template>
  <LocaleProvider locale="ar">
    <Marquee aria-label="شعارات الشركاء" :class="styles.root">
      <MarqueeEdge side="start" />
      <MarqueeViewport>
        <MarqueeContent>
          <MarqueeItem v-for="item in partners" :key="item.mark" :class="styles.item">
            <span>{{ item.mark }}</span>
            <span>{{ item.name }}</span>
          </MarqueeItem>
        </MarqueeContent>
      </MarqueeViewport>
      <MarqueeEdge side="end" />
    </Marquee>
  </LocaleProvider>
</template>