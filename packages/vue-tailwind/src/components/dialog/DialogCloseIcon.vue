<script setup lang="ts">
import { DialogCloseTrigger as ArkDialogCloseTrigger } from '@ark-ui/vue/dialog';
import type { DialogCloseTriggerProps } from '@ark-ui/vue/dialog';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import CloseButton from '../close-button/CloseButton.vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ Omit<DialogCloseTriggerProps, 'asChild'> {
  ariaLabel?: string;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDialogCloseTrigger v-bind="attrs" as-child>
    <CloseButton
      :aria-label="ariaLabel ?? a11yLabels.closeDialog"
      :class="
        cn(
          'absolute end-4 top-4 z-2 rounded-md [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
          className,
        )
      "
      data-slot="dialog-close-icon"
    >
      <slot v-if="$slots.default" />
    </CloseButton>
  </ArkDialogCloseTrigger>
</template>