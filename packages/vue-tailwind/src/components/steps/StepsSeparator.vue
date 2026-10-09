<script setup lang="ts">
import { StepsSeparator as ArkStepsSeparator } from '@ark-ui/vue/steps';
import type { StepsSeparatorProps } from '@ark-ui/vue/steps';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ StepsSeparatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkStepsSeparator
    v-bind="attrs"
    :class="
      cn(
        'pointer-events-none mx-2 h-px min-w-8 flex-auto bg-border group-last/steps-item:hidden data-complete:bg-foreground data-[orientation=vertical]:absolute data-[orientation=vertical]:start-[15.5px] data-[orientation=vertical]:top-10 data-[orientation=vertical]:-bottom-4 data-[orientation=vertical]:m-0 data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-px data-[orientation=vertical]:min-w-0',
        className,
      )
    "
    data-slot="steps-separator"
  >
    <slot />
  </ArkStepsSeparator>
</template>