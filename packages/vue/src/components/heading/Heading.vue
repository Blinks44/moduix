<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Heading.module.css';

type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type HeadingWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const elements = {
  h1: ark.h1,
  h2: ark.h2,
  h3: ark.h3,
  h4: ark.h4,
  h5: ark.h5,
  h6: ark.h6,
} as const;

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'h1'> {
  as?: HeadingElement;
  class?: HTMLAttributes['class'];
  size?: HeadingSize;
  weight?: HeadingWeight;
}

const { as: elementName, class: className, size, weight = 'semibold' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const element = computed(() => elements[elementName ?? 'h1']);
</script>

<template>
  <component
    :is="element"
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-scope="heading"
    data-part="root"
    data-slot="heading-root"
    :data-size="size"
    :data-weight="weight"
  >
    <slot />
  </component>
</template>