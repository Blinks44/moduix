<script setup lang="ts">
import {
  ComboboxClearTrigger as ArkComboboxClearTrigger,
  useComboboxContext,
} from '@ark-ui/vue/combobox';
import type { ComboboxClearTriggerProps } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CloseIcon } from '@/lib/moduix/icons/ui/Icons';
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
const hidden = computed(() => combobox.value.inputValue.length === 0);

const handleClick = (event: MouseEvent) => {
  if (!event.defaultPrevented) {
    event.preventDefault();
    combobox.value.setInputValue('');
  }
};

const handlePointerDown = (event: PointerEvent) => {
  if (event.button === 0) {
    event.preventDefault();
  }
};
</script>

<template>
  <ArkComboboxClearTrigger
    v-bind="attrs"
    :as-child="asChild"
    :aria-label="
      ariaLabel ??
      (!asChild && $slots.default == null && ariaLabelledby == null ? 'Clear search' : undefined)
    "
    :aria-labelledby="ariaLabelledby"
    :class="clsx(closeButtonStyles.root, styles.clearTrigger, className)"
    :hidden="hidden"
    @click="handleClick"
    @pointerdown="handlePointerDown"
    data-slot="command-palette-clear-trigger"
  >
    <slot><CloseIcon /></slot>
  </ArkComboboxClearTrigger>
</template>