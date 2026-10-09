<script setup lang="ts">
import { AngleSliderRootProvider as ArkAngleSliderRootProvider } from '@ark-ui/vue/angle-slider';
import type { AngleSliderRootProviderProps } from '@ark-ui/vue/angle-slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './AngleSlider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AngleSliderRootProviderProps {
  class?: HTMLAttributes['class'];
  value: AngleSliderRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAngleSliderRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="angle-slider-root-provider"
  >
    <slot />
  </ArkAngleSliderRootProvider>
</template>