<script setup lang="ts">
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { CloseIcon } from '@/lib/moduix/icons/ui/Icons';
import CloseButton from '../close-button/CloseButton.vue';
import styles from './Listbox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'button'> {
  ariaLabel?: string;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <CloseButton
    v-bind="attrs"
    :aria-label="ariaLabel ?? a11yLabels.clearSearch"
    :class="clsx(styles.clearTrigger, className)"
    data-slot="listbox-clear-trigger"
  >
    <slot><CloseIcon /></slot>
  </CloseButton>
</template>