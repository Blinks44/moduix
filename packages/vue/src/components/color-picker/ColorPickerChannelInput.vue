<script setup lang="ts">
import { ColorPickerChannelInput as ArkColorPickerChannelInput } from '@ark-ui/vue/color-picker';
import type { ColorPickerChannelInputProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './ColorPicker.module.css';

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
    :class="clsx(styles.channelInput, props.class)"
    :channel="props.channel"
    data-slot="color-picker-channel-input"
  />
</template>