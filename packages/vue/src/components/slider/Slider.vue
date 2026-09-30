<script setup lang="ts">
import { SliderRoot as ArkSliderRoot } from '@ark-ui/vue/slider';
import type { SliderRootEmits, SliderRootProps } from '@ark-ui/vue/slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Slider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderRootProps {
  class?: HTMLAttributes['class'];
  readOnly?: SliderRootProps['readOnly'];
}

export interface Emits extends /* @vue-ignore */ SliderRootEmits {}

const { class: className, readOnly = undefined } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-readonly="readOnly ? '' : undefined"
    :read-only="readOnly"
    data-slot="slider-root"
  >
    <slot />
  </ArkSliderRoot>
</template>