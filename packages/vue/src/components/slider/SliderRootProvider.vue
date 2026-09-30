<script setup lang="ts">
import { SliderRootProvider as ArkSliderRootProvider } from '@ark-ui/vue/slider';
import type { SliderRootProviderProps } from '@ark-ui/vue/slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Slider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderRootProviderProps {
  class?: HTMLAttributes['class'];
  value: SliderRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="slider-root-provider"
  >
    <slot />
  </ArkSliderRootProvider>
</template>