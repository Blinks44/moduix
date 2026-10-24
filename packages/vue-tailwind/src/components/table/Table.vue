<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

const tableVariants = cva('group/table isolate w-full border-collapse text-start text-foreground', {
  variants: {
    size: {
      sm: 'text-xs leading-4',
      md: 'text-sm leading-5',
      lg: 'text-md leading-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type TableSize = 'sm' | 'md' | 'lg';

export interface Props extends /* @vue-ignore */ HTMLArkProps<'table'> {
  class?: HTMLAttributes['class'];
  interactive?: boolean;
  showColumnBorder?: boolean;
  size?: TableSize;
  stickyHeader?: boolean;
  striped?: boolean;
}

const {
  class: className,
  interactive = false,
  showColumnBorder = false,
  size = 'md',
  stickyHeader = false,
  striped = false,
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass = computed(() => cn(tableVariants({ size }), className));
</script>

<template>
  <ark.table
    v-bind="attrs"
    :class="rootClass"
    data-scope="table"
    data-part="root"
    :data-interactive="interactive || undefined"
    :data-show-column-border="showColumnBorder || undefined"
    :data-size="size"
    :data-sticky-header="stickyHeader || undefined"
    :data-striped="striped || undefined"
    data-slot="table-root"
  >
    <slot />
  </ark.table>
</template>