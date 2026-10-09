<script setup lang="ts">
import { TocLink as ArkTocLink } from '@ark-ui/vue/toc';
import type { TocLinkProps } from '@ark-ui/vue/toc';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocLinkProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTocLink
    v-bind="attrs"
    :class="
      cn(
        'group/toc-link relative block min-w-0 overflow-hidden rounded-sm py-1 ps-[calc(0.875rem+max(0px,((var(--depth)-2)*0.5rem)))] pe-1 text-sm leading-5 text-ellipsis whitespace-nowrap text-muted-foreground no-underline outline-0 transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-ring has-[[data-slot=toc-rail]]:overflow-visible data-active:font-medium data-active:text-foreground motion-reduce:transition-none [@media(hover:hover)]:hover:text-foreground',
        className,
      )
    "
    data-slot="toc-link"
  >
    <slot />
  </ArkTocLink>
</template>