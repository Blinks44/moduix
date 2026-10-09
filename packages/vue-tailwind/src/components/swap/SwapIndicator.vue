<script setup lang="ts">
import { SwapIndicator as ArkSwapIndicator } from '@ark-ui/vue/swap';
import type { SwapIndicatorProps } from '@ark-ui/vue/swap';
import { useAttrs, type HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SwapIndicatorProps {
  class?: HTMLAttributes['class'];
  type: SwapIndicatorProps['type'];
}

const { class: className, type } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const indicatorClass =
  'items-center justify-center text-inherit group-data-[animation=flip]/swap:[backface-visibility:hidden] group-data-[animation=fade]/swap:data-[state=closed]:animate-moduix-swap-fade-exit group-data-[animation=flip]/swap:data-[state=closed]:animate-moduix-swap-flip-exit group-data-[animation=rotate]/swap:data-[state=closed]:animate-moduix-swap-rotate-exit group-data-[animation=scale]/swap:data-[state=closed]:animate-moduix-swap-scale-exit group-data-[animation=fade]/swap:data-[state=open]:animate-moduix-swap-fade-enter group-data-[animation=flip]/swap:data-[state=open]:animate-moduix-swap-flip-enter group-data-[animation=rotate]/swap:data-[state=open]:animate-moduix-swap-rotate-enter group-data-[animation=scale]/swap:data-[state=open]:animate-moduix-swap-scale-enter motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]';
</script>

<template>
  <ArkSwapIndicator
    v-bind="attrs"
    :class="cn(indicatorClass, className)"
    :type="type"
    data-slot="swap-indicator"
  >
    <slot />
  </ArkSwapIndicator>
</template>