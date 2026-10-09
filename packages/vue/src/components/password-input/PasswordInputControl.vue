<script setup lang="ts">
import { PasswordInputControl as ArkPasswordInputControl } from '@ark-ui/vue/password-input';
import type { PasswordInputControlProps } from '@ark-ui/vue/password-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './PasswordInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PasswordInputControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPasswordInputControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="password-input-control"
  >
    <slot />
  </ArkPasswordInputControl>
</template>