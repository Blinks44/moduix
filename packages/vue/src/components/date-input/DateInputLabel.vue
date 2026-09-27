<script setup lang="ts">
import { DateInputLabel as ArkDateInputLabel } from '@ark-ui/vue/date-input';
import type { DateInputLabelProps } from '@ark-ui/vue/date-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DateInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DateInputLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDateInputLabel
    v-bind="attrs"
    :class="clsx(styles.label, className)"
    data-slot="date-input-label"
  >
    <slot />
  </ArkDateInputLabel>
</template>