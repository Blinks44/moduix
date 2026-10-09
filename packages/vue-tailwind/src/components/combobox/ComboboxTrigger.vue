<script setup lang="ts">
import { ComboboxTrigger as ArkComboboxTrigger } from '@ark-ui/vue/combobox';
import type { ComboboxTriggerProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronUpDownIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxTrigger
    v-bind="attrs"
    :class="
      cn(
        'absolute end-2 top-1/2 m-0 box-border inline-flex size-control-xs shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0 [line-height:0] text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring disabled:cursor-default data-disabled:cursor-default motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground',
        className,
      )
    "
    data-slot="combobox-trigger"
  >
    <slot><ChevronUpDownIcon /></slot>
  </ArkComboboxTrigger>
</template>