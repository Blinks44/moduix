<script setup lang="ts">
import { TocRoot as ArkTocRoot } from '@ark-ui/vue/toc';
import type { TocRootEmits, TocRootProps } from '@ark-ui/vue/toc';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocRootProps {
  autoScroll?: boolean;
  class?: HTMLAttributes['class'];
  items: TocRootProps['items'];
}

export interface Emits extends /* @vue-ignore */ TocRootEmits {}

const { autoScroll = false, class: className, items } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'group/toc box-border grid w-full min-w-0 grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] gap-6 text-foreground has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)] max-md:grid-cols-[minmax(0,1fr)] max-md:has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(0,1fr)]';
</script>

<template>
  <ArkTocRoot
    v-bind="attrs"
    :auto-scroll="autoScroll"
    :class="cn(rootClass, className)"
    :items="items"
    data-slot="toc-root"
  >
    <slot />
  </ArkTocRoot>
</template>