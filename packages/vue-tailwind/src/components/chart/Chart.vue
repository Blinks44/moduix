<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'figure'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.figure
    v-bind="attrs"
    :class="
      cn(
        'grid w-full min-w-0 gap-5 rounded-lg border border-border bg-card p-5 text-card-foreground shadow-sm',
        className,
      )
    "
    data-scope="chart"
    data-part="root"
    data-slot="chart-root"
  >
    <slot />
  </ark.figure>
</template>