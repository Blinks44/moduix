<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { computed, useAttrs } from 'vue';
import type { CSSProperties, HTMLAttributes, StyleValue } from 'vue';
import { cn } from '@/lib/moduix/cn';

type StackDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type ResponsiveDirection = {
  mobile?: StackDirection;
  desktop?: StackDirection;
};

const stackVariants = cva('flex', {
  variants: {
    mobileDirection: {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      column: 'flex-col',
      'column-reverse': 'flex-col-reverse',
    },
    desktopDirection: {
      row: 'sm:flex-row',
      'row-reverse': 'sm:flex-row-reverse',
      column: 'sm:flex-col',
      'column-reverse': 'sm:flex-col-reverse',
    },
    fill: {
      true: 'flex-1',
      false: '',
    },
  },
  defaultVariants: {
    mobileDirection: 'column',
  },
});

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  align?: CSSProperties['alignItems'];
  class?: HTMLAttributes['class'];
  direction?: StackDirection | ResponsiveDirection;
  fill?: boolean;
  gap?: number | string;
  justify?: CSSProperties['justifyContent'];
  style?: StyleValue;
  wrap?: CSSProperties['flexWrap'];
}

const {
  align,
  class: className,
  direction,
  fill = undefined,
  gap,
  justify,
  style,
  wrap,
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();

const mobileDirection = computed(() =>
  typeof direction === 'string' ? direction : (direction?.mobile ?? direction?.desktop),
);
const desktopDirection = computed(() =>
  typeof direction === 'string' ? direction : (direction?.desktop ?? direction?.mobile),
);

const stackClass = computed(() =>
  cn(
    stackVariants({
      mobileDirection: mobileDirection.value,
      desktopDirection: desktopDirection.value,
      fill,
    }),
    className,
  ),
);

const toCssLength = (value: number | string | undefined) =>
  typeof value === 'number' ? `${value}px` : value;

const stackStyle = computed<StyleValue>(() => [
  {
    gap: toCssLength(gap),
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
  },
  style,
]);
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="stackClass"
    :style="stackStyle"
    data-scope="stack"
    data-part="root"
    data-slot="stack-root"
  >
    <slot />
  </ark.div>
</template>