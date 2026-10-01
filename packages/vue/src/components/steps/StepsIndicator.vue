<script setup lang="ts">
import { StepsIndicator as ArkStepsIndicator, useStepsItemContext } from '@ark-ui/vue/steps';
import type { StepsIndicatorProps } from '@ark-ui/vue/steps';
import { clsx } from 'clsx';
import { useAttrs, useSlots } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CheckIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Steps.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const slots = useSlots();
const item = useStepsItemContext();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsIndicator
    v-bind="attrs"
    :class="clsx(styles.indicator, className)"
    data-slot="steps-indicator"
  >
    <template v-if="slots.default"><slot /></template>
    <template v-else>
      <CheckIcon v-if="item.completed" />
      <template v-else>{{ item.index + 1 }}</template>
    </template>
  </ArkStepsIndicator>
</template>