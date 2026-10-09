<script setup lang="ts">
import { TimerArea as ArkTimerArea } from '@ark-ui/vue/timer';
import type { TimerAreaProps } from '@ark-ui/vue/timer';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Timer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TimerAreaProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTimerArea v-bind="attrs" :class="clsx(styles.area, className)" data-slot="timer-area">
    <slot />
  </ArkTimerArea>
</template>