<script setup lang="ts">
import { PaginationRoot as ArkPaginationRoot } from '@ark-ui/vue/pagination';
import type { PaginationRootEmits, PaginationRootProps } from '@ark-ui/vue/pagination';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PaginationRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ PaginationRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPaginationRoot
    v-bind="attrs"
    :class="
      cn('inline-flex max-w-full items-center gap-1 overflow-x-auto text-foreground', className)
    "
    data-slot="pagination-root"
  >
    <slot />
  </ArkPaginationRoot>
</template>