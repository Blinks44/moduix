<script setup lang="ts">
import {
  ColorPickerChannelSlider as ArkColorPickerChannelSlider,
  ColorPickerChannelSliderThumb as ArkColorPickerChannelSliderThumb,
  ColorPickerChannelSliderTrack as ArkColorPickerChannelSliderTrack,
  ColorPickerTransparencyGrid as ArkColorPickerTransparencyGrid,
} from '@ark-ui/vue/color-picker';
import type { ColorPickerChannelSliderProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

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
    :class="clsx(styles.channelSlider, className)"
    :channel="channel"
    data-slot="color-picker-channel-slider"
  >
    <slot>
      <ArkColorPickerTransparencyGrid
        v-if="channel === 'alpha'"
        data-slot="color-picker-transparency-grid"
        :class="styles.transparencyGrid"
      />
      <ArkColorPickerChannelSliderTrack
        data-slot="color-picker-channel-slider-track"
        :class="styles.channelSliderTrack"
      />
      <ArkColorPickerChannelSliderThumb
        data-slot="color-picker-channel-slider-thumb"
        :class="styles.thumb"
      />
    </slot>
  </ArkColorPickerChannelSlider>
</template>