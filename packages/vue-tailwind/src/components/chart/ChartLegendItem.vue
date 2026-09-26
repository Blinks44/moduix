<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'li'> {
  class?: HTMLAttributes['class'];
  asChild?: boolean;
  color?: string;
  style?: StyleValue;
}

const { class: className, asChild, color, style } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.li
    v-bind="attrs"
    :as-child="asChild"
    :class="cn('inline-flex items-center gap-2 text-sm text-muted-foreground', className)"
    :style="style"
    data-scope="chart"
    data-part="legend-item"
    data-slot="chart-legend-item"
  >
    <template v-if="asChild">
      <slot />
    </template>
    <template v-else>
      <span
        aria-hidden="true"
        class="size-2.5 shrink-0 rounded-full bg-muted-foreground shadow-[inset_0_0_0_1px_rgb(0_0_0_/_8%)]"
        :style="color ? { backgroundColor: color } : undefined"
      />
      <slot />
    </template>
  </ark.li>
</template>