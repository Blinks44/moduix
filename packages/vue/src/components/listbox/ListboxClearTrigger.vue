<script setup lang="ts">
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CloseIcon } from '@/internal/icons/ui/Icons';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import CloseButton from '../close-button/CloseButton.vue';
import styles from './Listbox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'button'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const ariaLabel = computed(
  () => (attrs['aria-label'] as string | undefined) ?? a11yLabels.clearSearch,
);
</script>

<template>
  <CloseButton
    v-bind="attrs"
    :aria-label="ariaLabel"
    :class="clsx(styles.clearTrigger, className)"
    data-slot="listbox-clear-trigger"
  >
    <slot><CloseIcon /></slot>
  </CloseButton>
</template>