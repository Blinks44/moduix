<script setup lang="ts">
import { TimerActionTrigger as ArkTimerActionTrigger } from '@ark-ui/vue/timer';
import type { TimerActionTriggerProps } from '@ark-ui/vue/timer';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Timer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TimerActionTriggerProps {
  action: TimerActionTriggerProps['action'];
  class?: HTMLAttributes['class'];
}

const { action, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTimerActionTrigger
    v-bind="attrs"
    :action="action"
    :class="clsx(styles.actionTrigger, className)"
    data-slot="timer-action-trigger"
  >
    <slot />
  </ArkTimerActionTrigger>
</template>