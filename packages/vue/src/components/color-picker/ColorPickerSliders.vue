<script setup lang="ts">
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';
import ColorPickerChannelSlider from './ColorPickerChannelSlider.vue';

defineOptions({ inheritAttrs: false });

export interface Props {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <div v-bind="attrs" :class="clsx(styles.sliders, className)" data-slot="color-picker-sliders">
    <ColorPickerChannelSlider channel="hue" />
    <ColorPickerChannelSlider channel="alpha" />
  </div>
</template>