<script setup lang="ts">
import { StepsSeparator as ArkStepsSeparator } from '@ark-ui/vue/steps';
import type { StepsSeparatorProps } from '@ark-ui/vue/steps';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Steps.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsSeparatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsSeparator
    v-bind="attrs"
    :class="clsx(styles.separator, className)"
    data-slot="steps-separator"
  >
    <slot />
  </ArkStepsSeparator>
</template>