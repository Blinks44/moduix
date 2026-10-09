<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Card.module.css';

defineOptions({ inheritAttrs: false });

type CardSize = 'sm' | 'md' | 'lg';
type CardVariant = 'elevated' | 'outline' | 'subtle';

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
  size?: CardSize;
  variant?: CardVariant;
}

const { class: className, size = 'md', variant = 'outline' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-scope="card"
    data-part="root"
    :data-size="size"
    :data-variant="variant"
    data-slot="card-root"
  >
    <slot />
  </ark.div>
</template>