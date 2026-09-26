<script setup lang="ts">
import {
  ColorPickerChannelSlider as ArkColorPickerChannelSlider,
  ColorPickerChannelSliderThumb as ArkColorPickerChannelSliderThumb,
  ColorPickerChannelSliderTrack as ArkColorPickerChannelSliderTrack,
  ColorPickerTransparencyGrid as ArkColorPickerTransparencyGrid,
} from '@ark-ui/vue/color-picker';
import type { ColorPickerChannelSliderProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerChannelSliderProps {
  class?: HTMLAttributes['class'];
  channel: ColorPickerChannelSliderProps['channel'];
}

const { class: className, channel } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerChannelSlider
    v-bind="attrs"
    :class="
      cn(
        'relative box-border flex h-3 touch-none items-center rounded-full select-none data-[orientation=vertical]:h-40 data-[orientation=vertical]:w-3 data-[orientation=vertical]:items-stretch data-[orientation=vertical]:justify-center',
        className,
      )
    "
    :channel="channel"
    data-slot="color-picker-channel-slider"
  >
    <slot>
      <ArkColorPickerTransparencyGrid
        v-if="channel === 'alpha'"
        data-slot="color-picker-transparency-grid"
        class="size-full rounded-[inherit]"
      />
      <ArkColorPickerChannelSliderTrack
        data-slot="color-picker-channel-slider-track"
        class="h-3 w-full rounded-[inherit] shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)] data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3"
      />
      <ArkColorPickerChannelSliderThumb
        data-slot="color-picker-channel-slider-thumb"
        class="box-border size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-[0_0_0_4px_rgb(0_0_0_/_18%),0_2px_4px_0_rgb(0_0_0_/_10%),0_1px_2px_-1px_rgb(0_0_0_/_10%)] ring-2 ring-background outline-0 focus-visible:ring-ring data-disabled:pointer-events-none"
      />
    </slot>
  </ArkColorPickerChannelSlider>
</template>