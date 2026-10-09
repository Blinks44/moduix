<script setup lang="ts">
import {
  Toc,
  TocContent,
  TocItem,
  TocLink,
  TocList,
  TocNav,
  TocRail,
  TocTitle,
} from '@moduix/vue/toc';
import { ref } from 'vue';
import styles from '@/components/examples/table-of-contents/table-of-contents-rail.module.css';

const items = [
  { value: 'toc-rail-overview', depth: 2, label: 'Overview' },
  { value: 'toc-rail-installation', depth: 2, label: 'Installation' },
  { value: 'toc-rail-package-manager', depth: 3, label: 'Package manager' },
  { value: 'toc-rail-dependencies', depth: 3, label: 'Peer dependencies' },
  { value: 'toc-rail-usage', depth: 2, label: 'Usage' },
  { value: 'toc-rail-server-components', depth: 3, label: 'Server components' },
  { value: 'toc-rail-theming', depth: 4, label: 'Theming' },
  { value: 'toc-rail-api', depth: 2, label: 'API reference' },
];

const paragraphs = [
  'The rail is opt-in: it adds a visual hierarchy without changing Ark tracking, links, or heading semantics.',
  'Each curve connects the previous item depth to the current one, so readers can follow a branch through nested sections.',
  'Use it when hierarchy is useful context; the standard list stays the clearer choice for a flat document.',
];

const scrollRef = ref<HTMLDivElement | null>(null);
const scrollEl = () => scrollRef.value;
</script>

<template>
  <Toc :class="styles.root" :items="items" :scroll-el="scrollEl">
    <TocContent>
      <div
        ref="scrollRef"
        aria-label="Scrollable document preview"
        :class="styles.scrollArea"
        tabindex="0"
      >
        <section v-for="item in items" :key="item.value">
          <component
            :is="item.depth === 2 ? 'h2' : item.depth === 3 ? 'h3' : 'h4'"
            :id="item.value"
          >
            {{ item.label }}
          </component>
          <p v-for="paragraph in paragraphs" :key="paragraph">{{ paragraph }}</p>
        </section>
      </div>
    </TocContent>

    <TocNav>
      <TocTitle>On this page</TocTitle>
      <TocList>
        <TocItem v-for="(item, index) in items" :key="item.value" :item="item">
          <TocLink :href="`#${item.value}`">
            <TocRail
              :depth="item.depth"
              :previous-depth="items[index - 1]?.depth"
              :next-depth="items[index + 1]?.depth"
            />
            {{ item.label }}
          </TocLink>
        </TocItem>
      </TocList>
    </TocNav>
  </Toc>
</template>