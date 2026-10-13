<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes, StyleValue } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
  style?: StyleValue;
  ratio?: number;
}

const { class: className, style, ratio = 1 } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();

// Invalid ratios, such as `0 / 0` before media metadata loads, fall back to a square frame.
const ratioStyle = computed<StyleValue>(() => [
  style,
  { '--_aspect-ratio-value': Number.isFinite(ratio) && ratio > 0 ? ratio : 1 },
]);
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="cn('relative block aspect-[var(--_aspect-ratio-value)] min-h-0 w-full', className)"
    :style="ratioStyle"
    data-scope="aspect-ratio"
    data-part="root"
    data-slot="aspect-ratio-root"
  >
    <slot />
  </ark.div>
</template>