<script setup lang="ts">
import { TourSpotlight as ArkTourSpotlight } from '@ark-ui/vue/tour';
import type { TourSpotlightProps } from '@ark-ui/vue/tour';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import OverlayPortal from '../../internal/overlayPortal/OverlayPortal.vue';
import styles from './Tour.module.css';

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
      :class="clsx(styles.spotlight, className)"
      data-slot="tour-spotlight"
    >
      <slot />
    </ArkTourSpotlight>
  </OverlayPortal>
</template>