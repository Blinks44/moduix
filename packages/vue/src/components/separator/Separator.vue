<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Separator.module.css';

defineOptions({ inheritAttrs: false });

type SeparatorOrientation = 'horizontal' | 'vertical';
type SeparatorSize = 'xs' | 'sm' | 'md' | 'lg';
type SeparatorVariant = 'solid' | 'dashed' | 'dotted';

export interface Props extends /* @vue-ignore */ HTMLArkProps<'span'> {
  class?: HTMLAttributes['class'];
  orientation?: SeparatorOrientation;
  role?: HTMLAttributes['role'];
  size?: SeparatorSize;
  variant?: SeparatorVariant;
}

const {
  class: className,
  orientation = 'horizontal',
  role,
  size = 'sm',
  variant = 'solid',
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const resolvedRole = computed(() => role ?? 'separator');
</script>

<template>
  <ark.span
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :role="resolvedRole"
    :aria-orientation="resolvedRole === 'separator' ? orientation : undefined"
    data-scope="separator"
    data-part="root"
    data-slot="separator-root"
    :data-orientation="orientation"
    :data-size="size"
    :data-variant="variant"
  >
    <slot />
  </ark.span>
</template>