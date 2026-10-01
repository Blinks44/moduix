<script setup lang="ts">
import { StepsTrigger as ArkStepsTrigger } from '@ark-ui/vue/steps';
import type { StepsTriggerProps } from '@ark-ui/vue/steps';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Steps.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsTrigger
    v-bind="attrs"
    :class="clsx(styles.trigger, className)"
    data-slot="steps-trigger"
  >
    <slot />
  </ArkStepsTrigger>
</template>