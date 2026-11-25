<script setup lang="ts">
import { ComboboxClearTrigger as ArkComboboxClearTrigger } from '@ark-ui/vue/combobox';
import type { ComboboxClearTriggerProps } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { useA11yLabels } from '@/lib/moduix/a11yLabels';
import CloseButton from '../close-button/CloseButton.vue';
import styles from './Combobox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxClearTriggerProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, ariaLabelledby, asChild, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const labels = useA11yLabels();
</script>

<template>
  <ArkComboboxClearTrigger
    v-if="asChild"
    v-bind="attrs"
    as-child
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :class="clsx(styles.clearTrigger, className)"
    data-slot="combobox-clear-trigger"
  >
    <slot />
  </ArkComboboxClearTrigger>
  <ArkComboboxClearTrigger
    v-else
    v-bind="attrs"
    as-child
    :class="clsx(styles.clearTrigger, className)"
    data-slot="combobox-clear-trigger"
  >
    <CloseButton
      :aria-label="ariaLabel ?? (ariaLabelledby == null ? labels.clearSelection : undefined)"
      :aria-labelledby="ariaLabelledby"
    >
      <slot />
    </CloseButton>
  </ArkComboboxClearTrigger>
</template>