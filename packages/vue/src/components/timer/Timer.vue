<script setup lang="ts">
import { TimerRoot as ArkTimerRoot } from '@ark-ui/vue/timer';
import type { TimerRootProps, UseTimerReturn } from '@ark-ui/vue/timer';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Timer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TimerRootProps {
  class?: HTMLAttributes['class'];
}

export interface TimerTickDetails {
  value: number;
  time: UseTimerReturn['value']['time'];
  formattedTime: UseTimerReturn['value']['formattedTime'];
}

export interface Emits {
  complete: [];
  tick: [details: TimerTickDetails];
}

const { class: className } = defineProps<Props>();
defineEmits</* @vue-ignore */ Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTimerRoot v-bind="attrs" :class="clsx(styles.root, className)" data-slot="timer-root">
    <slot />
  </ArkTimerRoot>
</template>