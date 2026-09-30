<script setup lang="ts">
import { clsx } from 'clsx';
import { useAttrs, type HTMLAttributes } from 'vue';
import { Button } from '../button';
import type { Props as ButtonProps } from '../button/Button.vue';
import { useSplitButtonContext, type SplitButtonSize, type SplitButtonVariant } from './context';
import styles from './SplitButton.module.css';

defineOptions({ inheritAttrs: false });
interface Props extends /* @vue-ignore */ Omit<ButtonProps, 'size' | 'variant'> {
  class?: HTMLAttributes['class'];
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
}
const { class: className, size, variant } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const context = useSplitButtonContext('SplitButtonAction');
</script>

<template>
  <Button
    v-bind="attrs"
    :size="size ?? context.size()"
    :variant="variant ?? context.variant()"
    :class="clsx(styles.action, className)"
    data-slot="split-button-action"
  >
    <slot />
  </Button>
</template>