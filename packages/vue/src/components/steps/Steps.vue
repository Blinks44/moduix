<script setup lang="ts">
import { StepsRoot as ArkStepsRoot } from '@ark-ui/vue/steps';
import type { StepChangeDetails, StepsRootProps } from '@ark-ui/vue/steps';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Steps.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits {
  stepChange: [details: StepChangeDetails];
  stepComplete: [];
  stepInvalid: [details: { step: number; action: 'next' | 'set'; targetStep?: number }];
  'update:step': [step: number];
}

const { class: className } = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsRoot v-bind="attrs" :class="clsx(styles.root, className)" data-slot="steps-root">
    <slot />
  </ArkStepsRoot>
</template>