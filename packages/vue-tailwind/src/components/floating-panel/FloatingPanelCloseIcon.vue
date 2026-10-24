<script setup lang="ts">
import { FloatingPanelCloseTrigger as ArkFloatingPanelCloseTrigger } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelCloseTriggerProps } from '@ark-ui/vue/floating-panel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import CloseButton from '../close-button/CloseButton.vue';
import { controlButtonClass } from './floating-panel.types';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<FloatingPanelCloseTriggerProps, 'asChild'> {
  ariaLabel?: string;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, class: className } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFloatingPanelCloseTrigger v-bind="attrs" as-child>
    <CloseButton
      :aria-label="ariaLabel ?? a11yLabels.closePanel"
      :class="cn(controlButtonClass, className)"
      data-slot="floating-panel-close-icon"
    >
      <template v-if="slots.default" #default><slot /></template>
    </CloseButton>
  </ArkFloatingPanelCloseTrigger>
</template>