<script setup lang="ts">
import { NumberInputDecrementTrigger as ArkNumberInputDecrementTrigger } from '@ark-ui/vue/number-input';
import type { NumberInputDecrementTriggerProps } from '@ark-ui/vue/number-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { MinusIcon } from '@/lib/moduix/icons/ui/Icons';

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
        'box-border inline-flex size-control-md min-w-control-md cursor-pointer items-center justify-center rounded-s-md border border-e-0 border-border bg-background p-0 text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none group-data-invalid/number-input:border-destructive focus-visible:z-1 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring group-data-invalid/number-input:focus-visible:outline-destructive active:bg-accent disabled:pointer-events-none data-disabled:pointer-events-none motion-reduce:transition-none [&>svg]:size-3.5 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        className,
      )
    "
    data-slot="number-input-decrement-trigger"
  >
    <slot v-if="$slots.default" />
    <MinusIcon v-else />
  </ArkNumberInputDecrementTrigger>
</template>