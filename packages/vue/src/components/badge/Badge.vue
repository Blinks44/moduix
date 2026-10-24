<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Badge.module.css';

defineOptions({ inheritAttrs: false });

export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';

export interface Props extends /* @vue-ignore */ HTMLArkProps<'span'> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  class?: HTMLAttributes['class'];
}

const { class: className, size = 'md', variant = 'default' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.span
    v-bind="attrs"
    data-scope="badge"
    data-part="root"
    data-slot="badge-root"
    :data-size="size"
    :data-variant="variant"
    :class="clsx(styles.root, className)"
  >
    <slot />
  </ark.span>
</template>