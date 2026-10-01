<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/vue/collapsible';
import {
  Toc,
  TocContext,
  TocContent,
  TocIndicator,
  TocItem,
  TocLink,
  TocList,
} from '@moduix/vue/toc';
import { ref } from 'vue';
import styles from '@/components/examples/table-of-contents/table-of-contents-with-collapsible.module.css';

const items = [
  { value: 'toc-collapsible-overview', depth: 2, label: 'Overview' },
  { value: 'toc-collapsible-prerequisites', depth: 2, label: 'Prerequisites' },
  { value: 'toc-collapsible-quick-start', depth: 2, label: 'Quick start' },
  { value: 'toc-collapsible-commands', depth: 2, label: 'Core commands' },
  { value: 'toc-collapsible-troubleshooting', depth: 2, label: 'Troubleshooting' },
];

const paragraphs = [
  'A collapsible navigation keeps the current section visible while giving the reader more room for the article.',
  'The same items drive the headings and links, so the active state stays synchronized with the scrollable reading pane.',
  'Use this pattern when a compact navigation control is more useful than a permanently expanded table of contents.',
];

const scrollRef = ref<HTMLDivElement | null>(null);
const scrollEl = () => scrollRef.value;
const getActiveIndex = (activeItems: Array<{ value: string }>) =>
  items.findIndex((item) => item.value === activeItems[0]?.value);
const getActiveLabel = (activeItems: Array<{ value: string }>) =>
  items[getActiveIndex(activeItems)]?.label ?? 'On this page';
const getProgress = (activeItems: Array<{ value: string }>) => {
  const index = getActiveIndex(activeItems);
  return index >= 0 ? ((index + 1) / items.length) * 100 : 0;
};
</script>

<template>
  <Toc :class="styles.root" :items="items" :scroll-el="scrollEl">
    <Collapsible :class="styles.collapsibleRoot" default-open>
      <TocContext v-slot="context">
        <CollapsibleTrigger>
          <span :class="styles.triggerContent">
            <svg
              width="28"
              height="28"
              viewBox="0 0 36 36"
              aria-hidden="true"
              :class="styles.progressRing"
            >
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="currentColor"
                stroke-opacity="0.2"
                stroke-width="2.5"
              />
              <circle
                data-progress
                cx="18"
                cy="18"
                r="14"
                fill="none"
                pathLength="100"
                stroke="currentColor"
                stroke-width="2.5"
                :stroke-dasharray="`${getProgress(context.activeItems)} 100`"
                stroke-linecap="round"
                transform="rotate(-90 18 18)"
              />
              <text
                x="18"
                y="18"
                text-anchor="middle"
                dominant-baseline="central"
                font-size="10"
                font-weight="600"
                fill="currentColor"
              >
                {{
                  getActiveIndex(context.activeItems) >= 0
                    ? getActiveIndex(context.activeItems) + 1
                    : '-'
                }}
              </text>
            </svg>
            <span :class="styles.triggerLabel">{{ getActiveLabel(context.activeItems) }}</span>
          </span>
          <CollapsibleIndicator />
        </CollapsibleTrigger>
      </TocContext>

      <CollapsibleContent>
        <TocList>
          <TocIndicator />
          <TocItem v-for="item in items" :key="item.value" :item="item">
            <TocLink :href="`#${item.value}`">{{ item.label }}</TocLink>
          </TocItem>
        </TocList>
      </CollapsibleContent>
    </Collapsible>

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
  </Toc>
</template>