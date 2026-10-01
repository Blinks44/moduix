<script setup lang="ts">
import {
  ComboboxClearTrigger as ArkComboboxClearTrigger,
  useComboboxContext,
} from '@ark-ui/vue/combobox';
import type { ComboboxClearTriggerProps } from '@ark-ui/vue/combobox';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CloseIcon } from '@/internal/icons/ui/Icons';
import { cn } from '@/lib/moduix/cn';

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
const hidden = computed(() => combobox.value.inputValue.length === 0);

const handleClick = (event: MouseEvent) => {
  if (!event.defaultPrevented) {
    event.preventDefault();
    combobox.value.setInputValue('');
  }
};

const handlePointerDown = (event: PointerEvent) => {
  if (event.button === 0) {
    event.preventDefault();
  }
};
</script>

<template>
  <ArkComboboxClearTrigger
    v-bind="attrs"
    :as-child="asChild"
    :aria-label="
      ariaLabel ??
      (!asChild && $slots.default == null && ariaLabelledby == null ? 'Clear search' : undefined)
    "
    :aria-labelledby="ariaLabelledby"
    :class="
      cn(
        'inline-flex size-control-xs shrink-0 cursor-pointer appearance-none items-center justify-center rounded-sm bg-transparent text-muted-foreground transition-[background-color,color,opacity,translate,scale] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-muted [@media(hover:hover)]:hover:text-foreground',
        className,
      )
    "
    :hidden="hidden"
    @click="handleClick"
    @pointerdown="handlePointerDown"
    data-slot="command-palette-clear-trigger"
  >
    <slot><CloseIcon /></slot>
  </ArkComboboxClearTrigger>
</template>