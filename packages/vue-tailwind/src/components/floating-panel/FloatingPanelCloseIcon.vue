<script setup lang="ts">
import { FloatingPanelCloseTrigger as ArkFloatingPanelCloseTrigger } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelCloseTriggerProps } from '@ark-ui/vue/floating-panel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import CloseButton from '../close-button/CloseButton.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<FloatingPanelCloseTriggerProps, 'asChild'> {
  ariaLabel?: string;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, class: className } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const closeIconClass =
  'box-border inline-flex size-control-sm cursor-pointer items-center justify-center rounded-sm border border-border bg-background p-0 text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none [font:inherit] focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none [&>svg]:size-4 [@media(hover:hover)]:hover:bg-accent';
</script>

<template>
  <ArkFloatingPanelCloseTrigger v-bind="attrs" as-child>
    <CloseButton
      :aria-label="ariaLabel ?? 'Close panel'"
      :class="cn(closeIconClass, className)"
      data-slot="floating-panel-close-icon"
    >
      <template v-if="slots.default" #default><slot /></template>
    </CloseButton>
  </ArkFloatingPanelCloseTrigger>
</template>