<script setup lang="ts">
import { ColorPickerFormatTrigger as ArkColorPickerFormatTrigger } from '@ark-ui/vue/color-picker';
import type { ColorPickerFormatTriggerProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerFormatTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerFormatTrigger
    v-bind="attrs"
    :class="
      cn(
        'box-border inline-flex h-control-md min-w-control-md shrink-0 items-center justify-center gap-2 rounded-md border border-border bg-transparent px-2 text-sm text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color,color] duration-200 ease-in-out focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default data-disabled:cursor-default data-focus:border-ring data-focus:outline-ring data-readonly:cursor-default motion-reduce:transition-none [&:not([disabled]):not([data-disabled]):not([data-readonly]):hover]:bg-muted [&:not([disabled]):not([data-disabled]):not([data-readonly]):hover]:text-foreground [&>svg]:size-4 [&>svg]:shrink-0',
        className,
      )
    "
    data-slot="color-picker-format-trigger"
  />
</template>