<script setup lang="ts">
import { StepsNextTrigger as ArkStepsNextTrigger } from '@ark-ui/vue/steps';
import type { StepsNextTriggerProps } from '@ark-ui/vue/steps';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Steps.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsNextTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsNextTrigger
    v-bind="attrs"
    :class="clsx(styles.nextTrigger, className)"
    data-slot="steps-next-trigger"
  >
    <slot />
  </ArkStepsNextTrigger>
</template>