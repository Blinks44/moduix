<script setup lang="ts">
import { StepsCompletedContent as ArkStepsCompletedContent } from '@ark-ui/vue/steps';
import type { StepsCompletedContentProps } from '@ark-ui/vue/steps';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Steps.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsCompletedContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsCompletedContent
    v-bind="attrs"
    :class="clsx(styles.completedContent, className)"
    data-slot="steps-completed-content"
  >
    <slot />
  </ArkStepsCompletedContent>
</template>