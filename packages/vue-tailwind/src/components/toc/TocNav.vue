<script setup lang="ts">
import { TocNav as ArkTocNav } from '@ark-ui/vue/toc';
import type { TocNavProps } from '@ark-ui/vue/toc';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocNavProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTocNav
    v-bind="attrs"
    :class="
      cn(
        'sticky top-4 max-h-[calc(100dvh-2rem)] min-w-0 self-start overflow-auto rounded-lg border border-border bg-card p-4 text-card-foreground data-[placement=left]:col-start-1 data-[placement=left]:row-start-1 max-md:data-[placement=left]:col-auto max-md:data-[placement=left]:row-auto',
        className,
      )
    "
    data-slot="toc-nav"
  >
    <slot />
  </ArkTocNav>
</template>