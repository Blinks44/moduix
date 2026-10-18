<script setup lang="ts">
import { ProgressRange as ArkProgressRange } from '@ark-ui/vue/progress';
import type { ProgressRangeProps } from '@ark-ui/vue/progress';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ProgressRangeProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkProgressRange
    v-bind="attrs"
    :class="
      cn(
        'h-full rounded-[inherit] bg-primary transition-[width,height] duration-normal ease-in-out data-[orientation=vertical]:w-full data-[state=indeterminate]:data-[orientation=horizontal]:w-[35%] data-[state=indeterminate]:data-[orientation=horizontal]:animate-moduix-progress-linear-indeterminate data-[state=indeterminate]:data-[orientation=vertical]:h-[35%] data-[state=indeterminate]:data-[orientation=vertical]:animate-moduix-progress-linear-indeterminate-vertical motion-reduce:data-[state=indeterminate]:data-[orientation]:animate-none [&:dir(rtl)]:data-[state=indeterminate]:data-[orientation=horizontal]:-scale-x-100',
        className,
      )
    "
    data-slot="progress-linear-range"
  >
    <slot />
  </ArkProgressRange>
</template>