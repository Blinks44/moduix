<script setup lang="ts">
import { ColorPickerChannelSlider as ArkColorPickerChannelSlider } from '@ark-ui/vue/color-picker';
import type { ColorPickerChannelSliderProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';
import ColorPickerChannelSliderThumb from './ColorPickerChannelSliderThumb.vue';
import ColorPickerChannelSliderTrack from './ColorPickerChannelSliderTrack.vue';
import ColorPickerTransparencyGrid from './ColorPickerTransparencyGrid.vue';

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
      <ColorPickerTransparencyGrid v-if="channel === 'alpha'" />
      <ColorPickerChannelSliderTrack />
      <ColorPickerChannelSliderThumb />
    </slot>
  </ArkColorPickerChannelSlider>
</template>