<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CloseIcon } from '@/internal/icons/ui/Icons';
import styles from './CloseButton.module.css';

defineOptions({ inheritAttrs: false });

type Booleanish = boolean | 'false' | 'true';

export interface Props extends /* @vue-ignore */ HTMLArkProps<'button'> {
  asChild?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  class?: HTMLAttributes['class'];
  dataDisabled?: string;
  dataPart?: string;
  dataScope?: string;
  dataSlot?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
  onClickCapture?: (event: MouseEvent) => void;
  type?: 'button' | 'reset' | 'submit';
}

const {
  asChild = false,
  ariaLabel,
  ariaLabelledby,
  class: className,
  dataDisabled,
  dataPart = 'root',
  dataScope = 'close-button',
  dataSlot = 'close-button-root',
  disabled = false,
  onClick,
  onClickCapture,
  type,
} = defineProps<Props>();

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const ariaDisabled = computed(() => attrs['aria-disabled'] as Booleanish | undefined);
const isDisabled = computed(
  () =>
    disabled ||
    ariaDisabled.value === true ||
    ariaDisabled.value === 'true' ||
    dataDisabled !== undefined,
);

const handleClickCapture = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  onClickCapture?.(event);
};

const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  onClick?.(event);
};
</script>

<template>
  <ark.button
    v-bind="attrs"
    :as-child="asChild"
    :type="asChild ? type : (type ?? 'button')"
    :disabled="asChild ? undefined : disabled"
    :aria-disabled="asChild && disabled ? true : ariaDisabled"
    :aria-label="ariaLabel ?? (ariaLabelledby == null ? 'Close' : undefined)"
    :aria-labelledby="ariaLabelledby"
    @click.capture="handleClickCapture"
    @click="handleClick"
    :data-scope="dataScope"
    :data-part="dataPart"
    :data-slot="dataSlot"
    :data-disabled="dataDisabled ?? (isDisabled ? '' : undefined)"
    :class="clsx(styles.root, className)"
  >
    <slot><CloseIcon /></slot>
  </ark.button>
</template>