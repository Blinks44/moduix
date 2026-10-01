<script setup lang="ts">
import { StepsList as ArkStepsList } from '@ark-ui/vue/steps';
import type { StepsListProps } from '@ark-ui/vue/steps';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Steps.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsListProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsList v-bind="attrs" :class="clsx(styles.list, className)" data-slot="steps-list">
    <slot />
  </ArkStepsList>
</template>