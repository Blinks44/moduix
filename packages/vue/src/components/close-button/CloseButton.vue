<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { CloseIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './CloseButton.module.css';

defineOptions({ inheritAttrs: false });

type Booleanish = boolean | 'false' | 'true';

export interface Props extends /* @vue-ignore */ HTMLArkProps<'button'> {
  asChild?: boolean;
  ariaDisabled?: Booleanish;
  ariaLabel?: string;
  ariaLabelledby?: string;
  class?: HTMLAttributes['class'];
  dataDisabled?: string;
  dataPart?: string;
  dataScope?: string;
  dataSlot?: string;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
}

const {
  asChild = false,
  ariaDisabled,
  ariaLabel,
  ariaLabelledby,
  class: className,
  dataDisabled,
  dataPart = 'root',
  dataScope = 'close-button',
  dataSlot = 'close-button-root',
  disabled = false,
  type,
} = defineProps<Props>();

defineSlots<{ default?: () => unknown }>();
const emit = defineEmits<{
  click: [event: MouseEvent];
  clickCapture: [event: MouseEvent];
}>();

const attrs = useAttrs();
const isDisabled = computed(
  () => disabled || ariaDisabled === true || ariaDisabled === 'true' || dataDisabled !== undefined,
);

// stopImmediatePropagation also skips the bubble @click below and listeners merged by asChild.
const handleClickCapture = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }
  emit('clickCapture', event);
};
</script>

<template>
  <ark.button
    @click.capture="handleClickCapture"
    @click="emit('click', $event)"
    v-bind="attrs"
    :as-child="asChild"
    :type="asChild ? type : (type ?? 'button')"
    :disabled="asChild ? undefined : disabled"
    :aria-disabled="asChild && disabled ? true : ariaDisabled"
    :aria-label="ariaLabel ?? (ariaLabelledby == null ? a11yLabels.close : undefined)"
    :aria-labelledby="ariaLabelledby"
    :data-scope="dataScope"
    :data-part="dataPart"
    :data-slot="dataSlot"
    :data-disabled="isDisabled ? (dataDisabled ?? '') : undefined"
    :class="clsx(styles.root, className)"
  >
    <slot><CloseIcon /></slot>
  </ark.button>
</template>