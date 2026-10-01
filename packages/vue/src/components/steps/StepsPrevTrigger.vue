<script setup lang="ts">
import { StepsPrevTrigger as ArkStepsPrevTrigger } from '@ark-ui/vue/steps';
import type { StepsPrevTriggerProps } from '@ark-ui/vue/steps';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Steps.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsPrevTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsPrevTrigger
    v-bind="attrs"
    :class="clsx(styles.prevTrigger, className)"
    data-slot="steps-prev-trigger"
  >
    <slot />
  </ArkStepsPrevTrigger>
</template>