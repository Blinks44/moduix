<script setup lang="ts">
import { StepsContent as ArkStepsContent } from '@ark-ui/vue/steps';
import type { StepsContentProps } from '@ark-ui/vue/steps';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Steps.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsContentProps {
  class?: HTMLAttributes['class'];
  index: StepsContentProps['index'];
}

const { class: className, index } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    :index="index"
    data-slot="steps-content"
  >
    <slot />
  </ArkStepsContent>
</template>