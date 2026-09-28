<script setup lang="ts">
import { FloatingPanelCloseTrigger as ArkFloatingPanelCloseTrigger } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelCloseTriggerProps } from '@ark-ui/vue/floating-panel';
import { clsx } from 'clsx';
import { computed, useAttrs, useSlots } from 'vue';
import type { HTMLAttributes } from 'vue';
import CloseButton from '../close-button/CloseButton.vue';
import styles from './FloatingPanel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<FloatingPanelCloseTriggerProps, 'asChild'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const closeLabel = computed(() => (attrs['aria-label'] as string | undefined) ?? 'Close panel');
const slots = useSlots();
</script>

<template>
  <ArkFloatingPanelCloseTrigger v-bind="attrs" as-child>
    <CloseButton
      v-if="slots.default"
      :aria-label="closeLabel"
      :class="clsx(styles.controlButton, className)"
      data-slot="floating-panel-close-icon"
    >
      <slot />
    </CloseButton>
    <CloseButton
      v-else
      :aria-label="closeLabel"
      :class="clsx(styles.controlButton, className)"
      data-slot="floating-panel-close-icon"
    />
  </ArkFloatingPanelCloseTrigger>
</template>