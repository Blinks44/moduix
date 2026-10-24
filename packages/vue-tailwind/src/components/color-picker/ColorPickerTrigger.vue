<script setup lang="ts">
import { ColorPickerTrigger as ArkColorPickerTrigger } from '@ark-ui/vue/color-picker';
import type { ColorPickerTriggerProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import ColorPickerValueSwatch from './ColorPickerValueSwatch.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerTrigger
    v-bind="attrs"
    :class="
      cn(
        'grid size-control-md shrink-0 cursor-pointer place-items-center overflow-hidden rounded-md border border-border bg-background p-1 text-sm outline-focus-inset outline-offset-focus-inset outline-transparent transition-[border-color,outline-color,background-color] duration-normal ease-in-out select-none focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default data-invalid:border-destructive data-invalid:outline-destructive data-readonly:cursor-default data-[fit-content]:inline-flex data-[fit-content]:w-auto data-[fit-content]:min-w-control-md data-[fit-content]:gap-2 data-[fit-content]:px-3 data-[state=open]:border-ring data-[state=open]:outline-ring [&>[data-slot=color-picker-value-swatch]]:size-full [&>[data-slot=color-picker-value-swatch]]:rounded-[inherit] [&>[data-slot=color-picker-value-swatch]]:[grid-area:1/1/2/2] data-[fit-content]:[&>[data-slot=color-picker-value-swatch]]:size-4 data-[fit-content]:[&>[data-slot=color-picker-value-swatch]]:rounded-sm',
        className,
      )
    "
    data-slot="color-picker-trigger"
  >
    <slot>
      <ColorPickerValueSwatch />
    </slot>
  </ArkColorPickerTrigger>
</template>