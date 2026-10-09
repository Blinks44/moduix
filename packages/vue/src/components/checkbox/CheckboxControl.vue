<script setup lang="ts">
import { CheckboxControl as ArkCheckboxControl } from '@ark-ui/vue/checkbox';
import type { CheckboxControlProps } from '@ark-ui/vue/checkbox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Checkbox.module.css';
import CheckboxIndicator from './CheckboxIndicator.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CheckboxControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCheckboxControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="checkbox-control"
  >
    <slot>
      <CheckboxIndicator />
      <CheckboxIndicator indeterminate />
    </slot>
  </ArkCheckboxControl>
</template>