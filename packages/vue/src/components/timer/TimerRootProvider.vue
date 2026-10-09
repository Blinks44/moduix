<script setup lang="ts">
import { TimerRootProvider as ArkTimerRootProvider } from '@ark-ui/vue/timer';
import type { TimerRootProviderProps } from '@ark-ui/vue/timer';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Timer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TimerRootProviderProps {
  class?: HTMLAttributes['class'];
  value: TimerRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTimerRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="timer-root-provider"
  >
    <slot />
  </ArkTimerRootProvider>
</template>