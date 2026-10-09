<script setup lang="ts">
import { ColorPickerChannelSliderValueText as ArkColorPickerChannelSliderValueText } from '@ark-ui/vue/color-picker';
import type { ColorPickerChannelSliderValueTextProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerChannelSliderValueTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerChannelSliderValueText
    v-bind="attrs"
    :class="clsx(styles.channelSliderValueText, className)"
    data-slot="color-picker-channel-slider-value-text"
  />
</template>