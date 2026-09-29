<script setup lang="ts">
import { ProgressLabel as ArkProgressLabel } from '@ark-ui/vue/progress';
import type { ProgressLabelProps } from '@ark-ui/vue/progress';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ProgressLinear.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressLabel
    v-bind="attrs"
    :class="clsx(styles.label, className)"
    data-slot="progress-linear-label"
  >
    <slot />
  </ArkProgressLabel>
</template>