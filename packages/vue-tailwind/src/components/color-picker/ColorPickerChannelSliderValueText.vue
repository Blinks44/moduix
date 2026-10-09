<script setup lang="ts">
import { ColorPickerChannelSliderValueText as ArkColorPickerChannelSliderValueText } from '@ark-ui/vue/color-picker';
import type { ColorPickerChannelSliderValueTextProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
    :class="cn('text-sm text-muted-foreground', className)"
    data-slot="color-picker-channel-slider-value-text"
  />
</template>