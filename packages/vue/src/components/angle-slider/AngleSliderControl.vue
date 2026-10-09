<script setup lang="ts">
import { AngleSliderControl as ArkAngleSliderControl } from '@ark-ui/vue/angle-slider';
import type { AngleSliderControlProps } from '@ark-ui/vue/angle-slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './AngleSlider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AngleSliderControlProps {
  class?: HTMLAttributes['class'];
}

const emit = defineEmits<{ pointerdown: [event: PointerEvent] }>();

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();

const handlePointerDown = (event: PointerEvent) => {
  emit('pointerdown', event);

  if (event.defaultPrevented || event.button !== 0) return;

  const currentTarget = event.currentTarget as HTMLElement | null;
  if (!currentTarget || currentTarget.matches('[data-disabled], [data-readonly]')) return;

  event.preventDefault();
  currentTarget
    .querySelector<HTMLElement>('[data-scope="angle-slider"][data-part="thumb"]')
    ?.focus({ preventScroll: true, focusVisible: false });
};
</script>

<template>
  <ArkAngleSliderControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    @pointerdown="handlePointerDown"
    data-slot="angle-slider-control"
  >
    <slot />
  </ArkAngleSliderControl>
</template>