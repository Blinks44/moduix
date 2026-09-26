<script setup lang="ts">
import type { AngleSliderControlProps } from '@ark-ui/vue/angle-slider';
import { useAttrs } from 'vue';
import AngleSliderControl from './AngleSliderControl.vue';
import AngleSliderThumb from './AngleSliderThumb.vue';
import AngleSliderValueText from './AngleSliderValueText.vue';

defineOptions({ inheritAttrs: false });

export interface Props
  extends /* @vue-ignore */ Omit<AngleSliderControlProps, 'asChild' | 'children'> {}

type DialEmits = { pointerdown: [event: PointerEvent] };

export interface Emits extends /* @vue-ignore */ DialEmits {}

defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <AngleSliderControl v-bind="attrs">
    <slot />
    <AngleSliderValueText />
    <AngleSliderThumb />
  </AngleSliderControl>
</template>