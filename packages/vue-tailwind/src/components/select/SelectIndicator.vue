<script setup lang="ts">
import { SelectIndicator as ArkSelectIndicator } from '@ark-ui/vue/select';
import type { SelectIndicatorProps } from '@ark-ui/vue/select';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronUpDownIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectIndicator
    v-bind="attrs"
    :class="
      cn(
        'pointer-events-none inline-flex size-control-xs shrink-0 items-center justify-center rounded-sm bg-transparent leading-none text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out peer-[:not([disabled]):not([data-disabled]):hover]/select-trigger:bg-muted peer-[:not([disabled]):not([data-disabled]):hover]/select-trigger:text-foreground motion-reduce:transition-none [&:is([data-slot=select-control]>*)]:absolute [&:is([data-slot=select-control]>*)]:end-2 [&:is([data-slot=select-control]>*)]:top-1/2 [&:is([data-slot=select-control]>*)]:-translate-y-1/2 [&>svg]:block [&>svg]:size-4',
        className,
      )
    "
    data-slot="select-indicator"
  >
    <slot><ChevronUpDownIcon /></slot>
  </ArkSelectIndicator>
</template>