<script setup lang="ts">
import { TocContent as ArkTocContent } from '@ark-ui/vue/toc';
import type { TocContentProps } from '@ark-ui/vue/toc';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTocContent
    v-bind="attrs"
    :class="
      cn(
        'min-w-0 scroll-smooth group-has-[[data-slot=toc-nav][data-placement=left]]/toc:col-start-2 group-has-[[data-slot=toc-nav][data-placement=left]]/toc:row-start-1 motion-reduce:scroll-auto max-md:group-has-[[data-slot=toc-nav][data-placement=left]]/toc:col-auto max-md:group-has-[[data-slot=toc-nav][data-placement=left]]/toc:row-auto',
        className,
      )
    "
    data-slot="toc-content"
  >
    <slot />
  </ArkTocContent>
</template>