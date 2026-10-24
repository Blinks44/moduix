<script setup lang="ts">
import { PasswordInputRoot as ArkPasswordInputRoot } from '@ark-ui/vue/password-input';
import type {
  PasswordInputRootProps,
  PasswordInputVisibilityChangeDetails,
} from '@ark-ui/vue/password-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './PasswordInput.module.css';

defineOptions({ inheritAttrs: false });

export type PasswordInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ PasswordInputRootProps {
  class?: HTMLAttributes['class'];
  size?: PasswordInputSize;
}

export interface PasswordInputRootEmits {
  visibilityChange: [details: PasswordInputVisibilityChangeDetails];
  'update:visible': [visible: boolean];
}

const { class: className, size = 'md' } = defineProps<Props>();
defineEmits</* @vue-ignore */ PasswordInputRootEmits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkPasswordInputRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-size="size"
    data-slot="password-input-root"
  >
    <slot />
  </ArkPasswordInputRoot>
</template>