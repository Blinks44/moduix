<script setup lang="ts">
import { MenuTrigger as ArkMenuTrigger, type MenuTriggerProps } from '@ark-ui/vue/menu';
import { clsx } from 'clsx';
import { useAttrs, type HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui/Icons';
import { Button } from '../button';
import { useSplitButtonContext, type SplitButtonSize, type SplitButtonVariant } from './context';
import styles from './SplitButton.module.css';

defineOptions({ inheritAttrs: false });
interface Props extends /* @vue-ignore */ Omit<MenuTriggerProps, 'asChild'> {
  class?: HTMLAttributes['class'];
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
}
const { class: className, size, variant } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const context = useSplitButtonContext('SplitButtonTrigger');
</script>

<template>
  <ArkMenuTrigger
    :aria-label="slots.default ? undefined : a11yLabels.moreActions"
    v-bind="attrs"
    as-child
    data-slot="split-button-trigger"
  >
    <Button
      :size="size ?? context.size()"
      :variant="variant ?? context.variant()"
      :class="clsx(styles.trigger, className)"
      data-slot="split-button-trigger"
    >
      <slot><ChevronDownIcon /></slot>
    </Button>
  </ArkMenuTrigger>
</template>