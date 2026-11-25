<script setup lang="ts">
import { PopoverCloseTrigger as ArkPopoverCloseTrigger } from '@ark-ui/vue/popover';
import type { PopoverCloseTriggerProps } from '@ark-ui/vue/popover';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { useA11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import CloseButton from '../close-button/CloseButton.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<PopoverCloseTriggerProps, 'asChild'> {
  ariaLabel?: string;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const labels = useA11yLabels();
</script>

<template>
  <ArkPopoverCloseTrigger v-bind="attrs" as-child>
    <CloseButton
      :aria-label="ariaLabel ?? labels.closePopover"
      :class="
        cn(
          'absolute end-3 top-3 not-data-disabled:hover:bg-accent not-data-disabled:hover:text-popover-foreground',
          className,
        )
      "
      data-slot="popover-close-icon"
    >
      <slot v-if="$slots.default" />
    </CloseButton>
  </ArkPopoverCloseTrigger>
</template>