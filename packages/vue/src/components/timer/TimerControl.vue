<script setup lang="ts">
import { TimerControl as ArkTimerControl } from '@ark-ui/vue/timer';
import type { TimerControlProps } from '@ark-ui/vue/timer';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Timer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TimerControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTimerControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="timer-control"
  >
    <slot />
  </ArkTimerControl>
</template>