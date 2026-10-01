<script setup lang="ts">
import { TimerRootProvider as ArkTimerRootProvider } from '@ark-ui/vue/timer';
import type { TimerRootProviderProps } from '@ark-ui/vue/timer';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
    :class="cn('inline-grid w-max max-w-full place-items-center gap-3 text-foreground', className)"
    :value="value"
    data-slot="timer-root-provider"
  >
    <slot />
  </ArkTimerRootProvider>
</template>