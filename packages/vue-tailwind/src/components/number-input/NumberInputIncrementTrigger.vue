<script setup lang="ts">
import { NumberInputIncrementTrigger as ArkNumberInputIncrementTrigger } from '@ark-ui/vue/number-input';
import type { NumberInputIncrementTriggerProps } from '@ark-ui/vue/number-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { PlusIcon } from '@/lib/moduix/icons/ui/Icons';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputIncrementTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputIncrementTrigger
    v-bind="attrs"
    :class="
      cn(
        'box-border inline-flex size-control-md min-w-control-md cursor-pointer items-center justify-center rounded-e-md border border-s-0 border-border bg-background p-0 text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none group-data-invalid/number-input:border-destructive focus-visible:z-1 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring group-data-invalid/number-input:focus-visible:outline-destructive active:bg-accent disabled:pointer-events-none data-disabled:pointer-events-none motion-reduce:transition-none [&>svg]:size-3.5 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        className,
      )
    "
    data-slot="number-input-increment-trigger"
  >
    <slot v-if="$slots.default" />
    <PlusIcon v-else />
  </ArkNumberInputIncrementTrigger>
</template>