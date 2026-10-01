<script setup lang="ts">
import { TourPositioner as ArkTourPositioner } from '@ark-ui/vue/tour';
import type { TourPositionerProps } from '@ark-ui/vue/tour';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import OverlayPortal from '../../internal/overlayPortal/OverlayPortal.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourPositionerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <OverlayPortal>
    <ArkTourPositioner
      :ref="forwardRef"
      v-bind="attrs"
      :class="
        cn(
          'z-[calc(50+var(--tour-layer,0)+var(--layer-index,0))] max-h-[var(--available-height)] max-w-[var(--available-width)] outline-0 [--tour-z-index:var(--moduix-tour-z-index,var(--moduix-z-modal))] data-[type=dialog]:fixed data-[type=dialog]:inset-0 data-[type=dialog]:grid data-[type=dialog]:place-items-center data-[type=dialog]:overflow-y-auto data-[type=dialog]:overscroll-contain data-[type=dialog]:p-4 data-[type=floating]:fixed data-[type=floating]:max-h-[calc(100dvh-3rem)] data-[type=floating]:max-w-[calc(100vw-3rem)] data-[type=floating]:data-[placement=bottom]:start-1/2 data-[type=floating]:data-[placement=bottom]:bottom-6 data-[type=floating]:data-[placement=bottom]:-translate-x-1/2 data-[type=floating]:data-[placement=bottom-end]:end-6 data-[type=floating]:data-[placement=bottom-end]:bottom-6 data-[type=floating]:data-[placement=bottom-start]:start-6 data-[type=floating]:data-[placement=bottom-start]:bottom-6 data-[type=floating]:data-[placement=center]:inset-1/2 data-[type=floating]:data-[placement=center]:-translate-x-1/2 data-[type=floating]:data-[placement=center]:-translate-y-1/2 data-[type=floating]:data-[placement=left]:start-6 data-[type=floating]:data-[placement=left]:top-1/2 data-[type=floating]:data-[placement=left]:-translate-y-1/2 data-[type=floating]:data-[placement=left-end]:start-6 data-[type=floating]:data-[placement=left-end]:bottom-6 data-[type=floating]:data-[placement=left-start]:start-6 data-[type=floating]:data-[placement=left-start]:top-6 data-[type=floating]:data-[placement=right]:end-6 data-[type=floating]:data-[placement=right]:top-1/2 data-[type=floating]:data-[placement=right]:-translate-y-1/2 data-[type=floating]:data-[placement=right-end]:end-6 data-[type=floating]:data-[placement=right-end]:bottom-6 data-[type=floating]:data-[placement=right-start]:end-6 data-[type=floating]:data-[placement=right-start]:top-6 data-[type=floating]:data-[placement=top]:start-1/2 data-[type=floating]:data-[placement=top]:top-6 data-[type=floating]:data-[placement=top]:-translate-x-1/2 data-[type=floating]:data-[placement=top-end]:end-6 data-[type=floating]:data-[placement=top-end]:top-6 data-[type=floating]:data-[placement=top-start]:start-6 data-[type=floating]:data-[placement=top-start]:top-6',
          className,
        )
      "
      data-slot="tour-positioner"
    >
      <slot />
    </ArkTourPositioner>
  </OverlayPortal>
</template>