<script setup lang="ts">
import { ColorPickerEyeDropperTrigger as ArkColorPickerEyeDropperTrigger } from '@ark-ui/vue/color-picker';
import type { ColorPickerEyeDropperTriggerProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { PipetteIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerEyeDropperTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerEyeDropperTrigger
    v-bind="attrs"
    :class="
      cn(
        'inline-flex h-control-md min-w-control-md shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-transparent px-2 text-sm text-muted-foreground outline-focus-inset outline-offset-focus-inset outline-transparent transition-[border-color,outline-color,background-color,color] duration-normal ease-in-out focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default data-readonly:cursor-default [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not(:disabled):not([data-readonly]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-readonly]):hover]:text-foreground',
        className,
      )
    "
    data-slot="color-picker-eye-dropper-trigger"
  >
    <slot>
      <PipetteIcon />
    </slot>
  </ArkColorPickerEyeDropperTrigger>
</template>