<script setup lang="ts">
import { DialogCloseTrigger as ArkDialogCloseTrigger } from '@ark-ui/vue/dialog';
import type { DialogCloseTriggerProps } from '@ark-ui/vue/dialog';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import CloseButton from '../close-button/CloseButton.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<DialogCloseTriggerProps, 'asChild'> {
  ariaLabel?: string;
  ariaLabelledby?: string;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, ariaLabelledby, class: className } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDialogCloseTrigger v-bind="attrs" as-child>
    <CloseButton
      :aria-label="ariaLabel ?? a11yLabels.closeImage"
      :aria-labelledby="ariaLabelledby"
      :class="
        cn(
          'fixed end-4 top-4 z-[calc(var(--moduix-z-popup)+var(--layer-index,0)+1)] size-8 bg-background text-foreground',
          className,
        )
      "
      data-slot="lightbox-close-icon"
    >
      <slot v-if="slots.default" />
    </CloseButton>
  </ArkDialogCloseTrigger>
</template>