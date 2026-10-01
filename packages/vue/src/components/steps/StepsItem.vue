<script setup lang="ts">
import { StepsItem as ArkStepsItem } from '@ark-ui/vue/steps';
import type { StepsItemProps } from '@ark-ui/vue/steps';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Steps.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsItemProps {
  class?: HTMLAttributes['class'];
  index: StepsItemProps['index'];
}

const { class: className, index } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsItem
    v-bind="attrs"
    :class="clsx(styles.item, className)"
    :index="index"
    data-slot="steps-item"
  >
    <slot />
  </ArkStepsItem>
</template>