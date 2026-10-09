<script setup lang="ts">
import { AngleSliderControl as ArkAngleSliderControl } from '@ark-ui/vue/angle-slider';
import type { AngleSliderControlProps } from '@ark-ui/vue/angle-slider';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AngleSliderControlProps {
  class?: HTMLAttributes['class'];
}

const emit = defineEmits<{ pointerdown: [event: PointerEvent] }>();

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();

const controlClass =
  "relative box-border aspect-square w-32 min-w-0 cursor-pointer rounded-full outline-0 select-none [--angle-slider-fill:var(--color-primary)] before:absolute before:inset-0 before:rounded-full before:bg-[conic-gradient(from_0deg,var(--angle-slider-fill)_var(--angle,0deg),var(--color-muted)_var(--angle,0deg))] before:[mask-image:radial-gradient(closest-side,transparent_calc(100%-0.5rem-1px),#000_calc(100%-0.5rem))] before:content-[''] after:absolute after:top-1 after:left-1/2 after:z-1 after:size-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-[var(--angle-slider-fill)] after:content-[''] data-disabled:cursor-default data-invalid:[--angle-slider-fill:var(--color-destructive)] data-readonly:cursor-default";

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
    :class="cn(controlClass, className)"
    @pointerdown="handlePointerDown"
    data-slot="angle-slider-control"
  >
    <slot />
  </ArkAngleSliderControl>
</template>