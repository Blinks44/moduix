<script setup lang="ts">
import { PasswordInputLabel as ArkPasswordInputLabel } from '@ark-ui/vue/password-input';
import type { PasswordInputLabelProps } from '@ark-ui/vue/password-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './PasswordInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PasswordInputLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPasswordInputLabel
    v-bind="attrs"
    :class="clsx(styles.label, className)"
    data-slot="password-input-label"
  >
    <slot />
  </ArkPasswordInputLabel>
</template>