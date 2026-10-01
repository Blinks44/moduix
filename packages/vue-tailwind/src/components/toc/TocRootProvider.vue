<script setup lang="ts">
import { TocRootProvider as ArkTocRootProvider } from '@ark-ui/vue/toc';
import type { TocRootProviderProps } from '@ark-ui/vue/toc';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocRootProviderProps {
  class?: HTMLAttributes['class'];
  value: TocRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'group/toc box-border grid w-full min-w-0 grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)] gap-6 text-foreground has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)] max-md:grid-cols-[minmax(0,1fr)] max-md:has-[[data-slot=toc-nav][data-placement=left]]:grid-cols-[minmax(0,1fr)]';
</script>

<template>
  <ArkTocRootProvider
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :value="value"
    data-slot="toc-root-provider"
  >
    <slot />
  </ArkTocRootProvider>
</template>