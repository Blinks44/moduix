<script setup lang="ts">
import { ProgressCircle as ArkProgressCircle } from '@ark-ui/vue/progress';
import type { ProgressCircleProps } from '@ark-ui/vue/progress';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ProgressCircular.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressCircleProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressCircle
    v-bind="attrs"
    :class="clsx(styles.circle, className)"
    data-slot="progress-circular-circle"
  >
    <slot />
  </ArkProgressCircle>
</template>