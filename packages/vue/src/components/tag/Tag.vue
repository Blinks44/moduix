<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tag.module.css';

defineOptions({ inheritAttrs: false });

type TagVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type TagSize = 'sm' | 'md';

export interface Props extends /* @vue-ignore */ HTMLArkProps<'span'> {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
  size?: TagSize;
  variant?: TagVariant;
}

const {
  asChild = false,
  class: className,
  size = 'md',
  variant = 'default',
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.span
    v-bind="attrs"
    :as-child="asChild"
    data-scope="tag"
    data-part="root"
    data-slot="tag-root"
    :data-size="size"
    :data-variant="variant"
    :class="clsx(styles.root, className)"
  >
    <slot />
  </ark.span>
</template>