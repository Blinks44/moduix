<script setup lang="ts">
import { CheckboxIndicator as ArkCheckboxIndicator } from '@ark-ui/vue/checkbox';
import type { CheckboxIndicatorProps } from '@ark-ui/vue/checkbox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CheckIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Checkbox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CheckboxIndicatorProps {
  class?: HTMLAttributes['class'];
  indeterminate?: CheckboxIndicatorProps['indeterminate'];
}

const { class: className, indeterminate = undefined } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCheckboxIndicator
    v-bind="attrs"
    :class="clsx(styles.indicator, className)"
    :indeterminate="indeterminate"
    data-slot="checkbox-indicator"
  >
    <slot>
      <IndeterminateIcon v-if="indeterminate" />
      <CheckIcon v-else />
    </slot>
  </ArkCheckboxIndicator>
</template>