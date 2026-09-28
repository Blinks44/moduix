<script setup lang="ts">
import { FloatingPanelCloseTrigger as ArkFloatingPanelCloseTrigger } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelCloseTriggerProps } from '@ark-ui/vue/floating-panel';
import { computed, useAttrs, useSlots } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import CloseButton from '../close-button/CloseButton.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<FloatingPanelCloseTriggerProps, 'asChild'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const closeLabel = computed(() => (attrs['aria-label'] as string | undefined) ?? 'Close panel');
const closeIconClass =
  'box-border inline-flex size-control-sm cursor-pointer items-center justify-center rounded-sm border border-border bg-background p-0 text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none [font:inherit] focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none [&>svg]:size-4 [@media(hover:hover)]:hover:bg-accent';
const slots = useSlots();
</script>

<template>
  <ArkFloatingPanelCloseTrigger v-bind="attrs" as-child>
    <CloseButton
      v-if="slots.default"
      :aria-label="closeLabel"
      :class="cn(closeIconClass, className)"
      data-slot="floating-panel-close-icon"
    >
      <slot />
    </CloseButton>
    <CloseButton
      v-else
      :aria-label="closeLabel"
      :class="cn(closeIconClass, className)"
      data-slot="floating-panel-close-icon"
    />
  </ArkFloatingPanelCloseTrigger>
</template>