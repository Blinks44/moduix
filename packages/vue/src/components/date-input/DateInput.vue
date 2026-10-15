<script setup lang="ts">
import { DateInputRoot as ArkDateInputRoot } from '@ark-ui/vue/date-input';
import type { DateInputRootEmits, DateInputRootProps } from '@ark-ui/vue/date-input';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './DateInput.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DateInputRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ DateInputRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkDateInputRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-slot="date-input-root"
  >
    <slot />
  </ArkDateInputRoot>
</template>