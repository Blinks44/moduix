<script setup lang="ts">
import { TimerItem as ArkTimerItem } from '@ark-ui/vue/timer';
import type { TimerItemProps } from '@ark-ui/vue/timer';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Timer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TimerItemProps {
  class?: HTMLAttributes['class'];
  type: TimerItemProps['type'];
}

const { class: className, type } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTimerItem
    v-bind="attrs"
    :class="clsx(styles.item, className)"
    :type="type"
    data-slot="timer-item"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </ArkTimerItem>
</template>