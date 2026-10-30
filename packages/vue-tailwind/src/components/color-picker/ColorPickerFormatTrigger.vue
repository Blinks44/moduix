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
        'inline-flex h-control-md min-w-control-md shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-transparent px-2 text-sm text-muted-foreground outline-focus-halo outline-transparent transition-[border-color,outline-color,background-color,color] duration-normal ease-in-out focus-visible:border-ring focus-visible:outline-ring/50 disabled:cursor-default data-readonly:cursor-default [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not(:disabled):not([data-readonly]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-readonly]):hover]:text-foreground',
        className,
      )
    "
    data-slot="color-picker-format-trigger"
  />
</template>