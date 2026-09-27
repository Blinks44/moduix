<script setup lang="ts">
import { RadioGroupIndicator as ArkRadioGroupIndicator } from '@ark-ui/vue/radio-group';
import type { RadioGroupIndicatorProps } from '@ark-ui/vue/radio-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './RadioGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RadioGroupIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRadioGroupIndicator
    v-bind="attrs"
    :class="clsx(styles.indicator, className)"
    data-slot="radio-group-indicator"
  >
    <slot />
  </ArkRadioGroupIndicator>
</template>