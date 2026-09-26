<script setup lang="ts">
import { ComboboxItemIndicator as ArkComboboxItemIndicator } from '@ark-ui/vue/combobox';
import type { ComboboxItemIndicatorProps } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CheckIcon } from '@/internal/icons/ui/Icons';
import styles from './Combobox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxItemIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxItemIndicator
    v-bind="attrs"
    :class="clsx(styles.itemIndicator, className)"
    data-slot="combobox-item-indicator"
  >
    <slot><CheckIcon /></slot>
  </ArkComboboxItemIndicator>
</template>