<script setup lang="ts">
import { PasswordInputIndicator as ArkPasswordInputIndicator } from '@ark-ui/vue/password-input';
import type { PasswordInputIndicatorProps } from '@ark-ui/vue/password-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { EyeClosedIcon, EyeIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './PasswordInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PasswordInputIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const slots = defineSlots<{
  default?: () => unknown;
  fallback?: (props: { fallback: string | undefined }) => unknown;
}>();

const attrs = useAttrs();
</script>

<template>
  <ArkPasswordInputIndicator
    v-bind="attrs"
    :class="clsx(styles.indicator, className)"
    data-slot="password-input-indicator"
  >
    <template v-if="slots.fallback" #fallback="slotProps">
      <slot name="fallback" v-bind="slotProps" />
    </template>
    <template v-else-if="attrs.fallback === undefined" #fallback>
      <EyeClosedIcon />
    </template>
    <slot>
      <EyeIcon />
    </slot>
  </ArkPasswordInputIndicator>
</template>