<script setup lang="ts">
import { TourSpotlight as ArkTourSpotlight } from '@ark-ui/vue/tour';
import type { TourSpotlightProps } from '@ark-ui/vue/tour';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import OverlayPortal from '../../internal/overlayPortal/OverlayPortal.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourSpotlightProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <OverlayPortal>
    <ArkTourSpotlight
      :ref="forwardRef"
      v-bind="attrs"
      :class="
        cn('z-[calc(50+var(--tour-layer,0)+var(--layer-index,0))] ring-2 ring-ring', className)
      "
      data-slot="tour-spotlight"
    >
      <slot />
    </ArkTourSpotlight>
  </OverlayPortal>
</template>