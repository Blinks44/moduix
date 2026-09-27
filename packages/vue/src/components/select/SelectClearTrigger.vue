<script setup lang="ts">
import { SelectClearTrigger as ArkSelectClearTrigger } from '@ark-ui/vue/select';
import type { SelectClearTriggerProps } from '@ark-ui/vue/select';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import CloseButton from '../close-button/CloseButton.vue';
import styles from './Select.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectClearTriggerProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, ariaLabelledby, asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectClearTrigger
    v-if="asChild"
    v-bind="attrs"
    as-child
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :class="clsx(styles.clearTrigger, className)"
    data-slot="select-clear-trigger"
  >
    <slot />
  </ArkSelectClearTrigger>
  <ArkSelectClearTrigger
    v-else
    v-bind="attrs"
    as-child
    :class="clsx(styles.clearTrigger, className)"
    data-slot="select-clear-trigger"
  >
    <CloseButton
      :aria-label="ariaLabel ?? (ariaLabelledby == null ? 'Clear selection' : undefined)"
      :aria-labelledby="ariaLabelledby"
    >
      <slot />
    </CloseButton>
  </ArkSelectClearTrigger>
</template>