<script setup lang="ts">
import { StepsProgress as ArkStepsProgress } from '@ark-ui/vue/steps';
import type { StepsProgressProps } from '@ark-ui/vue/steps';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Steps.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsProgressProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsProgress
    v-bind="attrs"
    :class="clsx(styles.progress, className)"
    data-slot="steps-progress"
  >
    <slot />
  </ArkStepsProgress>
</template>