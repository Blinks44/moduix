<script setup lang="ts">
import { ColorPickerChannelSliderTrack as ArkColorPickerChannelSliderTrack } from '@ark-ui/vue/color-picker';
import type { ColorPickerChannelSliderTrackProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

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
    :class="clsx(styles.channelSliderTrack, className)"
    data-slot="color-picker-channel-slider-track"
  />
</template>