<script setup lang="ts">
import { DateInputControl as ArkDateInputControl } from '@ark-ui/vue/date-input';
import type { DateInputControlProps } from '@ark-ui/vue/date-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DateInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DateInputControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDateInputControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="date-input-control"
  >
    <slot />
  </ArkDateInputControl>
</template>