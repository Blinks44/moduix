<script setup lang="ts">
import { ProgressValueText as ArkProgressValueText } from '@ark-ui/vue/progress';
import type { ProgressValueTextProps } from '@ark-ui/vue/progress';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ProgressLinear.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressValueTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressValueText
    v-if="$slots.default"
    v-bind="attrs"
    :class="clsx(styles.valueText, className)"
    data-slot="progress-linear-value-text"
  >
    <slot />
  </ArkProgressValueText>
  <ArkProgressValueText
    v-else
    v-bind="attrs"
    :class="clsx(styles.valueText, className)"
    data-slot="progress-linear-value-text"
  />
</template>