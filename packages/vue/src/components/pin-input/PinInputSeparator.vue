<script setup lang="ts">
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './PinInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <span
    aria-hidden="true"
    role="presentation"
    v-bind="attrs"
    :class="clsx(styles.separator, className)"
    data-slot="pin-input-separator"
  >
    <slot><SeparatorMarkIcon /></slot>
  </span>
</template>