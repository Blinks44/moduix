<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import Spinner from '../spinner/Spinner.vue';
import styles from './Button.module.css';

defineOptions({ inheritAttrs: false });

export type ButtonVariant =
  | 'default'
  | 'outline'
  | 'secondary'
  | 'destructive'
  | 'destructive-outline'
  | 'ghost'
  | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon-md' | 'icon-lg';
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
  loadingIndicator?: boolean;
  loadingText?: string;
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
  loadingIndicator = true,
  loadingText = undefined,
  size = 'md',
  type,
  variant = 'default',
} = defineProps<Props>();

defineSlots<{
  default?: () => unknown;
  'loading-indicator'?: () => unknown;
}>();
const emit = defineEmits<{
  click: [event: MouseEvent];
  clickCapture: [event: MouseEvent];
}>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
const isDisabled = computed(
  () => disabled || loading || ariaDisabled === true || ariaDisabled === 'true',
);
const isIconSize = computed(() => size === 'icon-sm' || size === 'icon-md' || size === 'icon-lg');

const handleClickCapture = (event: MouseEvent) => {
  if (isDisabled.value) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  emit('clickCapture', event);
};
</script>

<template>
  <ark.button
    :ref="forwardRef"
    v-bind="attrs"
    :as-child="asChild"
    :type="asChild ? type : (type ?? 'button')"
    :disabled="asChild ? undefined : isDisabled"
    :aria-busy="loading ? true : ariaBusy"
    :aria-disabled="isDisabled ? true : ariaDisabled"
    @click.capture="handleClickCapture"
    @click="emit('click', $event)"
    :data-scope="dataScope"
    :data-part="dataPart"
    :data-slot="dataSlot"
    :data-variant="variant"
    :data-size="size"
    :data-disabled="isDisabled ? '' : undefined"
    :data-loading="loading ? '' : undefined"
    :class="clsx(styles.root, className)"
  >
    <template v-if="loading && !asChild">
      <slot name="loading-indicator">
        <Spinner v-if="loadingIndicator" decorative size="sm" />
      </slot>
      <template v-if="loadingText !== undefined">{{ loadingText }}</template>
      <slot v-else-if="!isIconSize" />
    </template>
    <slot v-else />
  </ark.button>
</template>