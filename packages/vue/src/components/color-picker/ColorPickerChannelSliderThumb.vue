<script setup lang="ts">
import { ColorPickerChannelSliderThumb as ArkColorPickerChannelSliderThumb } from '@ark-ui/vue/color-picker';
import type { ColorPickerChannelSliderThumbProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerChannelSliderThumbProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkColorPickerChannelSliderThumb
    v-bind="attrs"
    :class="clsx(styles.thumb, className)"
    data-slot="color-picker-channel-slider-thumb"
  />
</template>