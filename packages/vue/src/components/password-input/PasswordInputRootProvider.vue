<script setup lang="ts">
import { PasswordInputRootProvider as ArkPasswordInputRootProvider } from '@ark-ui/vue/password-input';
import type { PasswordInputRootProviderProps } from '@ark-ui/vue/password-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './PasswordInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PasswordInputRootProviderProps {
  class?: HTMLAttributes['class'];
  value: PasswordInputRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPasswordInputRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="password-input-root-provider"
  >
    <slot />
  </ArkPasswordInputRootProvider>
</template>