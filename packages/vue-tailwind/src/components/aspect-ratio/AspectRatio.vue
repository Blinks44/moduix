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
  ratio: number;
}

const { class: className, style, ratio } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();

const ratioStyle = computed<StyleValue>(() => {
  if (!Number.isFinite(ratio) || ratio <= 0) {
    throw new RangeError('AspectRatio `ratio` must be a finite number greater than zero.');
  }

  return [style, { '--_aspect-ratio-value': ratio }];
});
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="cn('relative block aspect-[var(--_aspect-ratio-value)] w-full', className)"
    :style="ratioStyle"
    data-scope="aspect-ratio"
    data-part="root"
    data-slot="aspect-ratio-root"
  >
    <slot />
  </ark.div>
</template>