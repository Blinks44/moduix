<script setup lang="ts">
import {
  ComboboxClearTrigger as ArkComboboxClearTrigger,
  useComboboxContext,
} from '@ark-ui/vue/combobox';
import type { ComboboxClearTriggerProps } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import closeButtonStyles from '../close-button/CloseButton.module.css';
import styles from './CommandPalette.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ ComboboxClearTriggerProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, ariaLabelledby, asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const combobox = useComboboxContext();
const hidden = computed(() => combobox.value.inputValue === '');

// Clear only the query; Ark's own handler would also clear the selected value.
const handleClick = (event: MouseEvent) => {
  if (!event.defaultPrevented) {
    event.preventDefault();
    combobox.value.setInputValue('');
  }
};
</script>

<template>
  <ArkComboboxClearTrigger
    v-bind="attrs"
    :as-child="asChild"
    :aria-label="
      ariaLabel ?? (!asChild && ariaLabelledby == null ? a11yLabels.clearSearch : undefined)
    "
    :aria-labelledby="ariaLabelledby"
    :class="clsx(closeButtonStyles.root, styles.clearTrigger, className)"
    :hidden="hidden"
    @click="handleClick"
    data-slot="command-palette-clear-trigger"
  >
    <slot><CloseIcon /></slot>
  </ArkComboboxClearTrigger>
</template>