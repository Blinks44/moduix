<script setup lang="ts">
import {
  ComboboxClearTrigger as ArkComboboxClearTrigger,
  useComboboxContext,
} from '@ark-ui/vue/combobox';
import type { ComboboxClearTriggerProps } from '@ark-ui/vue/combobox';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import { CloseIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ ComboboxClearTriggerProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, ariaLabelledby, asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const combobox = useComboboxContext();
const hidden = computed(() => combobox.value.inputValue === '');

// Clear only the query; Ark's own handler would also clear the selected value.
const handleClick = (event: MouseEvent) => {
  if (!event.defaultPrevented) {
    event.preventDefault();
    combobox.value.setInputValue('');
  }
};
</script>

<template>
  <ArkComboboxClearTrigger
    v-bind="attrs"
    :as-child="asChild"
    :aria-label="
      ariaLabel ?? (!asChild && ariaLabelledby == null ? a11yLabels.clearSearch : undefined)
    "
    :aria-labelledby="ariaLabelledby"
    :class="
      cn(
        `m-0 inline-flex size-control-xs shrink-0 cursor-pointer appearance-none items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color,opacity] duration-normal ease-in-out select-none focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-disabled [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-foreground`,
        className,
      )
    "
    :hidden="hidden"
    @click="handleClick"
    data-slot="command-palette-clear-trigger"
  >
    <slot><CloseIcon /></slot>
  </ArkComboboxClearTrigger>
</template>