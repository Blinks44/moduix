<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Heading.module.css';

export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type HeadingWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const defaultSizes: Record<HeadingElement, HeadingSize> = {
  h1: '2xl',
  h2: 'xl',
  h3: 'lg',
  h4: 'md',
  h5: 'sm',
  h6: 'xs',
};

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'h1'> {
  as?: HeadingElement;
  class?: HTMLAttributes['class'];
  size?: HeadingSize;
  weight?: HeadingWeight;
}

const { as = 'h1', class: className, size, weight = 'semibold' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <component
    :is="ark[as]"
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-scope="heading"
    data-part="root"
    data-slot="heading-root"
    :data-size="size ?? defaultSizes[as]"
    :data-weight="weight"
  >
    <slot />
  </component>
</template>