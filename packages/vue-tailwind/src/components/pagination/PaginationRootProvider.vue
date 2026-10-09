<script setup lang="ts">
import { PaginationRootProvider as ArkPaginationRootProvider } from '@ark-ui/vue/pagination';
import type { PaginationRootProviderProps } from '@ark-ui/vue/pagination';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PaginationRootProviderProps {
  class?: HTMLAttributes['class'];
  value: PaginationRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPaginationRootProvider
    v-bind="attrs"
    :class="
      cn('inline-flex max-w-full items-center gap-1 overflow-x-auto text-foreground', className)
    "
    :value="value"
    data-slot="pagination-root-provider"
  >
    <slot />
  </ArkPaginationRootProvider>
</template>