<script setup lang="ts">
import { ColorPickerChannelSliderLabel as ArkColorPickerChannelSliderLabel } from '@ark-ui/vue/color-picker';
import type { ColorPickerChannelSliderLabelProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerChannelSliderLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerChannelSliderLabel
    v-bind="attrs"
    :class="clsx(styles.channelSliderLabel, className)"
    data-slot="color-picker-channel-slider-label"
  />
</template>