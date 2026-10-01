<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  TocContent,
  TocIndicator,
  TocItem,
  TocLink,
  TocList,
  TocNav,
  TocRootProvider,
  TocTitle,
  useToc,
} from '@moduix/vue/toc';
import { ref } from 'vue';
import styles from '@/components/examples/table-of-contents/table-of-contents-root-provider.module.css';

const items = [
  { value: 'toc-provider-overview', depth: 2, label: 'Overview' },
  { value: 'toc-provider-installation', depth: 2, label: 'Installation' },
  { value: 'toc-provider-usage', depth: 2, label: 'Usage' },
];

const paragraphs = [
  'The store can power controls outside the navigation while the same visible-heading state still drives the links.',
  'In an embedded reader, point scrollEl to the pane that owns the overflow. This prevents document scroll from influencing the active section.',
  'Use the public scrollTo method when a separate control should move the reader to a known section.',
];

const scrollRef = ref<HTMLDivElement | null>(null);
const scrollEl = () => scrollRef.value;
const toc = useToc({
  items,
  defaultActiveIds: ['toc-provider-overview'],
  scrollEl,
});
</script>

<template>
  <div :class="styles.root">
    <output :class="styles.status">Active: {{ toc.activeIds.join(', ') || 'none' }}</output>
    <div :class="styles.actions">
      <Button
        v-for="item in items"
        :key="item.value"
        size="sm"
        variant="outline"
        @click="toc.scrollTo(item.value)"
      >
        Scroll to {{ item.label }}
      </Button>
    </div>

    <TocRootProvider :class="styles.toc" :value="toc">
      <TocContent>
        <div
          ref="scrollRef"
          aria-label="Scrollable document preview"
          :class="styles.scrollArea"
          tabindex="0"
        >
          <section v-for="item in items" :key="item.value">
            <h2 :id="item.value">{{ item.label }}</h2>
            <p v-for="paragraph in paragraphs" :key="paragraph">{{ paragraph }}</p>
          </section>
        </div>
      </TocContent>

      <TocNav>
        <TocTitle>On this page</TocTitle>
        <TocList>
          <TocIndicator />
          <TocItem v-for="item in items" :key="item.value" :item="item">
            <TocLink :href="`#${item.value}`">{{ item.label }}</TocLink>
          </TocItem>
        </TocList>
      </TocNav>
    </TocRootProvider>
  </div>
</template>