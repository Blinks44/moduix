<script setup lang="ts">
import { TourPositioner as ArkTourPositioner } from '@ark-ui/vue/tour';
import type { TourPositionerProps } from '@ark-ui/vue/tour';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';
import styles from './Tour.module.css';

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
      :class="clsx(styles.positioner, className)"
      data-slot="tour-positioner"
    >
      <slot />
    </ArkTourPositioner>
  </OverlayPortal>
</template>