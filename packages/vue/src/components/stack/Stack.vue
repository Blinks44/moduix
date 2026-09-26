<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { CSSProperties, HTMLAttributes, StyleValue } from 'vue';
import styles from './Stack.module.css';

type StackDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type ResponsiveDirection = {
  mobile?: StackDirection;
  desktop?: StackDirection;
};

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

const toCssLength = (value: number | string | undefined) =>
  typeof value === 'number' ? `${value}px` : value;

const stackStyle = computed<StyleValue>(() => [
  {
    '--moduix-stack-direction-desktop': desktopDirection.value ?? 'column',
    '--moduix-stack-direction-mobile': mobileDirection.value ?? 'column',
    ...(fill == null ? {} : { '--moduix-stack-flex': fill ? '1 1 0%' : 'initial' }),
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
    :class="clsx(styles.root, className)"
    :style="stackStyle"
    data-scope="stack"
    data-part="root"
    data-slot="stack-root"
  >
    <slot />
  </ark.div>
</template>