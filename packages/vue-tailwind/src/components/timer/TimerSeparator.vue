<script setup lang="ts">
import { TimerSeparator as ArkTimerSeparator } from '@ark-ui/vue/timer';
import type { TimerSeparatorProps } from '@ark-ui/vue/timer';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TimerSeparatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTimerSeparator
    v-bind="attrs"
    :class="cn('text-muted-foreground', className)"
    data-slot="timer-separator"
  >
    <slot />
  </ArkTimerSeparator>
</template>