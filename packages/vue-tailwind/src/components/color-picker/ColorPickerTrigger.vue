<script setup lang="ts">
import {
  ColorPickerTransparencyGrid as ArkColorPickerTransparencyGrid,
  ColorPickerTrigger as ArkColorPickerTrigger,
  ColorPickerValueSwatch as ArkColorPickerValueSwatch,
} from '@ark-ui/vue/color-picker';
import type { ColorPickerTriggerProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
        'group/trigger box-border grid size-control-md shrink-0 place-items-center overflow-hidden rounded-md border border-border bg-background p-1 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color] duration-200 ease-in-out select-none focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default data-disabled:cursor-default data-invalid:border-destructive data-invalid:outline-destructive data-readonly:cursor-default data-[fit-content]:inline-flex data-[fit-content]:w-auto data-[fit-content]:min-w-control-md data-[fit-content]:gap-2 data-[fit-content]:px-3 data-[state=open]:border-ring data-[state=open]:outline-ring motion-reduce:transition-none',
        className,
      )
    "
    data-slot="color-picker-trigger"
  >
    <slot>
      <ArkColorPickerTransparencyGrid
        data-slot="color-picker-transparency-grid"
        class="col-start-1 row-start-1 size-full rounded-[inherit] group-data-[fit-content]/trigger:col-auto group-data-[fit-content]/trigger:row-auto group-data-[fit-content]/trigger:size-4 group-data-[fit-content]/trigger:shrink-0"
      />
      <ArkColorPickerValueSwatch
        data-slot="color-picker-value-swatch"
        class="z-1 col-start-1 row-start-1 size-full rounded-[inherit] group-data-[fit-content]/trigger:col-auto group-data-[fit-content]/trigger:row-auto group-data-[fit-content]/trigger:size-4 group-data-[fit-content]/trigger:shrink-0"
      />
    </slot>
  </ArkColorPickerTrigger>
</template>