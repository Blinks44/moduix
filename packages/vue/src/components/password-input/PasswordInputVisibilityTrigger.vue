<script setup lang="ts">
import { PasswordInputVisibilityTrigger as ArkPasswordInputVisibilityTrigger } from '@ark-ui/vue/password-input';
import type { PasswordInputVisibilityTriggerProps } from '@ark-ui/vue/password-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './PasswordInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PasswordInputVisibilityTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPasswordInputVisibilityTrigger
    v-bind="attrs"
    :class="clsx(styles.visibilityTrigger, className)"
    data-slot="password-input-visibility-trigger"
  >
    <slot />
  </ArkPasswordInputVisibilityTrigger>
</template>