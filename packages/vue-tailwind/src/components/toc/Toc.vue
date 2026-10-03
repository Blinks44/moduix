<script setup lang="ts">
import { TocRoot as ArkTocRoot } from '@ark-ui/vue/toc';
import type { TocRootEmits, TocRootProps } from '@ark-ui/vue/toc';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { tocRootVariants } from './Toc.variants';

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
</script>

<template>
  <ArkTocRoot
    v-bind="attrs"
    :auto-scroll="autoScroll"
    :class="cn(tocRootVariants(), className)"
    :items="items"
    data-slot="toc-root"
  >
    <slot />
  </ArkTocRoot>
</template>