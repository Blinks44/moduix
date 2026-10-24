<script setup lang="ts">
import { NumberInputDecrementTrigger as ArkNumberInputDecrementTrigger } from '@ark-ui/vue/number-input';
import type { NumberInputDecrementTriggerProps } from '@ark-ui/vue/number-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { MinusIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputDecrementTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputDecrementTrigger
    v-bind="attrs"
    :class="
      cn(
        'inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center border border-border bg-background p-0 text-foreground outline-focus-inset outline-offset-focus-inset outline-transparent transition-[background-color,border-color,color] duration-normal ease-in-out select-none group-data-invalid/number-input:border-destructive group-data-[size=lg]/number-input:size-control-lg group-data-[size=sm]/number-input:size-control-sm group-data-[size=xl]/number-input:size-control-xl group-data-[size=xs]/number-input:size-control-xs focus-visible:z-1 focus-visible:outline-ring group-data-invalid/number-input:focus-visible:outline-destructive active:bg-accent data-disabled:pointer-events-none data-disabled:text-muted-foreground [&>svg]:size-3.5 group-data-[size=lg]/number-input:[&>svg]:size-4 group-data-[size=sm]/number-input:[&>svg]:size-3 group-data-[size=xl]/number-input:[&>svg]:size-4 group-data-[size=xs]/number-input:[&>svg]:size-3 [@media(hover:hover)]:hover:bg-accent',
        'rounded-s-md border-e-0',
        className,
      )
    "
    data-slot="number-input-decrement-trigger"
  >
    <slot v-if="$slots.default" />
    <MinusIcon v-else />
  </ArkNumberInputDecrementTrigger>
</template>