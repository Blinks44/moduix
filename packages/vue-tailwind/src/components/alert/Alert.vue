<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

type AlertStatus = 'info' | 'success' | 'warning' | 'error';

const alertVariants = cva(
  'group/alert box-border flex w-full min-w-0 items-start gap-3 rounded-lg border bg-card p-3 text-card-foreground',
  {
    variants: {
      status: {
        info: 'border-border',
        success:
          'border-success/34 bg-[color-mix(in_oklab,var(--color-success)_10%,var(--color-background))] text-foreground',
        warning:
          'border-warning/38 bg-[color-mix(in_oklab,var(--color-warning)_13%,var(--color-background))] text-foreground',
        error:
          'border-destructive/35 bg-[color-mix(in_oklab,var(--color-destructive)_9%,var(--color-background))] text-foreground',
      },
    },
    defaultVariants: {
      status: 'info',
    },
  },
);

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
  status?: AlertStatus;
}

const { class: className, status = 'info' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="cn(alertVariants({ status }), className)"
    data-scope="alert"
    data-part="root"
    :data-status="status"
    data-slot="alert-root"
  >
    <slot />
  </ark.div>
</template>