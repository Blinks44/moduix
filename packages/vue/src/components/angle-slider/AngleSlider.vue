<script setup lang="ts">
import { AngleSliderRoot as ArkAngleSliderRoot } from '@ark-ui/vue/angle-slider';
import type { AngleSliderRootProps, UseAngleSliderProps } from '@ark-ui/vue/angle-slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './AngleSlider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AngleSliderRootProps {
  class?: HTMLAttributes['class'];
}

type AngleSliderRootEmits = {
  valueChange: [details: Parameters<NonNullable<UseAngleSliderProps['onValueChange']>>[0]];
  valueChangeEnd: [details: Parameters<NonNullable<UseAngleSliderProps['onValueChangeEnd']>>[0]];
  'update:modelValue': [value: number];
};

export interface Emits extends /* @vue-ignore */ AngleSliderRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAngleSliderRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-slot="angle-slider-root"
  >
    <slot />
  </ArkAngleSliderRoot>
</template>
