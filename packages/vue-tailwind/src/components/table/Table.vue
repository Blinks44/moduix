<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

const tableVariants = cva(
  'group/table isolate w-full border-collapse border-spacing-0 text-left text-foreground',
  {
    variants: {
      size: {
        sm: 'text-xs leading-4',
        md: 'text-sm leading-5',
        lg: 'text-md leading-6',
      },
      variant: {
        line: '',
        outline: 'border border-border',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'line',
    },
  },
);

export interface Props extends /* @vue-ignore */ HTMLArkProps<'table'> {
  class?: HTMLAttributes['class'];
  interactive?: boolean;
  showColumnBorder?: boolean;
  size?: 'sm' | 'md' | 'lg';
  stickyHeader?: boolean;
  striped?: boolean;
  variant?: 'line' | 'outline';
}

const {
  class: className,
  interactive = false,
  showColumnBorder = false,
  size = 'md',
  stickyHeader = false,
  striped = false,
  variant = 'line',
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass = computed(() => cn(tableVariants({ size, variant }), className));
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
    :data-variant="variant"
    data-slot="table-root"
  >
    <slot />
  </ark.table>
</template>