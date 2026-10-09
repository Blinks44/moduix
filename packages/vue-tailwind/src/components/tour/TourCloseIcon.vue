<script setup lang="ts">
import { TourCloseTrigger as ArkTourCloseTrigger } from '@ark-ui/vue/tour';
import type { TourCloseTriggerProps } from '@ark-ui/vue/tour';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import CloseButton from '../close-button/CloseButton.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<TourCloseTriggerProps, 'asChild'> {
  class?: HTMLAttributes['class'];
  ariaLabel?: HTMLAttributes['aria-label'];
}

const { class: className, ariaLabel } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourCloseTrigger v-bind="attrs" as-child>
    <CloseButton
      :aria-label="ariaLabel ?? 'Close tour'"
      :class="
        cn(
          'absolute end-4 top-4 size-7 rounded-md bg-transparent text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:size-4 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
          className,
        )
      "
      data-slot="tour-close-icon"
    >
      <template v-if="$slots.default" #default>
        <slot />
      </template>
    </CloseButton>
  </ArkTourCloseTrigger>
</template>