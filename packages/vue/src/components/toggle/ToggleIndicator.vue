<script setup lang="ts">
import { ToggleIndicator as ArkToggleIndicator } from '@ark-ui/vue/toggle';
import type { ToggleIndicatorProps } from '@ark-ui/vue/toggle';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Toggle.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ToggleIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{
  default?: () => unknown;
  fallback?: () => unknown;
}>();

const attrs = useAttrs();
</script>

<template>
  <ArkToggleIndicator
    v-bind="attrs"
    :class="clsx(styles.indicator, className)"
    data-slot="toggle-indicator"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
    <template v-if="$slots.fallback" #fallback>
      <slot name="fallback" />
    </template>
  </ArkToggleIndicator>
</template>