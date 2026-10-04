<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Button.module.css';

defineOptions({ inheritAttrs: false });

type ButtonVariant =
  | 'default'
  | 'outline'
  | 'secondary'
  | 'destructive'
  | 'destructive-outline'
  | 'ghost'
  | 'link';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon-md' | 'icon-lg';
type Booleanish = boolean | 'false' | 'true';

export interface Props extends /* @vue-ignore */ HTMLArkProps<'button'> {
  dataPart?: string;
  dataScope?: string;
  dataSlot?: string;
  asChild?: boolean;
  ariaBusy?: Booleanish;
  ariaDisabled?: Booleanish;
  class?: HTMLAttributes['class'];
  disabled?: boolean;
  loading?: boolean;
  size?: ButtonSize;
  type?: 'button' | 'reset' | 'submit';
  variant?: ButtonVariant;
}

const {
  dataPart = 'root',
  dataScope = 'button',
  dataSlot = 'button-root',
  asChild = false,
  ariaBusy = undefined,
  ariaDisabled = undefined,
  class: className,
  disabled = false,
  loading = false,
  size = 'md',
  type,
  variant = 'default',
} = defineProps<Props>();

defineSlots<{ default?: () => unknown }>();
const emit = defineEmits<{
  click: [event: MouseEvent];
  clickCapture: [event: MouseEvent];
}>();

const attrs = useAttrs();
const isDisabled = computed(
  () => disabled || loading || ariaDisabled === true || ariaDisabled === 'true',
);

const handleClickCapture = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  emit('clickCapture', event);
};

const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  emit('click', event);
};
</script>

<template>
  <ark.button
    v-bind="attrs"
    :as-child="asChild"
    :type="asChild ? type : (type ?? 'button')"
    :disabled="asChild ? undefined : isDisabled"
    :aria-busy="loading ? true : ariaBusy"
    :aria-disabled="isDisabled ? true : ariaDisabled"
    @click.capture="handleClickCapture"
    @click="handleClick"
    :data-scope="dataScope"
    :data-part="dataPart"
    :data-slot="dataSlot"
    :data-variant="variant"
    :data-size="size"
    :data-disabled="isDisabled ? '' : undefined"
    :data-loading="loading ? '' : undefined"
    :class="clsx(styles.root, className)"
  >
    <slot />
  </ark.button>
</template>