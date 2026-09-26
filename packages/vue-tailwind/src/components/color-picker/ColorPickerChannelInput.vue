<script setup lang="ts">
import { ColorPickerChannelInput as ArkColorPickerChannelInput } from '@ark-ui/vue/color-picker';
import type { ColorPickerChannelInputProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerChannelInputProps {
  class?: HTMLAttributes['class'];
  channel:
    | 'hue'
    | 'saturation'
    | 'brightness'
    | 'lightness'
    | 'red'
    | 'green'
    | 'blue'
    | 'alpha'
    | 'hex'
    | 'css';
}

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const props = defineProps<Props>();
</script>

<template>
  <ArkColorPickerChannelInput
    v-bind="attrs"
    :class="
      cn(
        'box-border h-control-md w-full min-w-0 [appearance:textfield] rounded-md border border-border bg-background px-3 text-sm text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out focus:border-ring focus:outline-ring data-disabled:opacity-50 data-invalid:border-destructive data-invalid:outline-destructive data-[channel=alpha]:w-16 data-[channel=alpha]:flex-none motion-reduce:transition-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none',
        props.class,
      )
    "
    :channel="props.channel"
    data-slot="color-picker-channel-input"
  />
</template>