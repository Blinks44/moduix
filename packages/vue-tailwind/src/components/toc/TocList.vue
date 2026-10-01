<script setup lang="ts">
import { TocList as ArkTocList } from '@ark-ui/vue/toc';
import type { TocListProps } from '@ark-ui/vue/toc';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocListProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const listClass =
  "relative m-0 grid list-none gap-0.5 py-0 ps-1 has-[[data-slot=toc-indicator]]:before:pointer-events-none has-[[data-slot=toc-indicator]]:before:absolute has-[[data-slot=toc-indicator]]:before:inset-y-0.5 has-[[data-slot=toc-indicator]]:before:start-0 has-[[data-slot=toc-indicator]]:before:w-0.5 has-[[data-slot=toc-indicator]]:before:rounded-full has-[[data-slot=toc-indicator]]:before:bg-border has-[[data-slot=toc-indicator]]:before:content-['']";
</script>

<template>
  <ArkTocList v-bind="attrs" :class="cn(listClass, className)" data-slot="toc-list">
    <slot />
  </ArkTocList>
</template>