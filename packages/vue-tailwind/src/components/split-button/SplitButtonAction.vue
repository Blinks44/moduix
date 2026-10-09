<script setup lang="ts">
import { useAttrs, type HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { Button } from '../button';
import type { Props as ButtonProps } from '../button/Button.vue';
import { useSplitButtonContext, type SplitButtonSize, type SplitButtonVariant } from './context';

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
const pressResetClass = "motion-safe:[&:not([data-variant='link']):active]:[translate:none]";
</script>

<template>
  <Button
    v-bind="attrs"
    :size="size ?? context.size()"
    :variant="variant ?? context.variant()"
    :class="cn('rounded-e-none', pressResetClass, className)"
    data-slot="split-button-action"
  >
    <slot />
  </Button>
</template>