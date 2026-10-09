<script setup lang="ts">
import { TocRootProvider as ArkTocRootProvider } from '@ark-ui/vue/toc';
import type { TocRootProviderProps } from '@ark-ui/vue/toc';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { tocRootVariants } from './Toc.variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocRootProviderProps {
  class?: HTMLAttributes['class'];
  value: TocRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTocRootProvider
    v-bind="attrs"
    :class="cn(tocRootVariants(), className)"
    :value="value"
    data-slot="toc-root-provider"
  >
    <slot />
  </ArkTocRootProvider>
</template>