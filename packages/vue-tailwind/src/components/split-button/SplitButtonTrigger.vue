<script setup lang="ts">
import { MenuTrigger as ArkMenuTrigger, type MenuTriggerProps } from '@ark-ui/vue/menu';
import { useAttrs, type HTMLAttributes } from 'vue';
import { useA11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import { Button } from '../button';
import { useSplitButtonContext, type SplitButtonSize, type SplitButtonVariant } from './context';
import { splitButtonTriggerVariants } from './SplitButton.variants';

defineOptions({ inheritAttrs: false });
export interface Props extends /* @vue-ignore */ Omit<MenuTriggerProps, 'asChild'> {
  class?: HTMLAttributes['class'];
  size?: SplitButtonSize;
  variant?: SplitButtonVariant;
}
const { class: className, size, variant } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const context = useSplitButtonContext('SplitButtonTrigger');
const labels = useA11yLabels();
</script>

<template>
  <ArkMenuTrigger
    :aria-label="slots.default ? undefined : labels.moreActions"
    v-bind="attrs"
    as-child
  >
    <Button
      :size="size ?? context.size()"
      :variant="variant ?? context.variant()"
      :class="cn(splitButtonTriggerVariants({ size: size ?? context.size() }), className)"
      data-slot="split-button-trigger"
    >
      <slot><ChevronDownIcon /></slot>
    </Button>
  </ArkMenuTrigger>
</template>