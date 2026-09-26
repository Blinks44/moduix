<script setup lang="ts">
import { ColorPickerChannelSliderTrack as ArkColorPickerChannelSliderTrack } from '@ark-ui/vue/color-picker';
import type { ColorPickerChannelSliderTrackProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerChannelSliderTrackProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerChannelSliderTrack
    v-bind="attrs"
    :class="
      cn(
        'h-3 w-full rounded-[inherit] shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)] data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3',
        className,
      )
    "
    data-slot="color-picker-channel-slider-track"
  />
</template>