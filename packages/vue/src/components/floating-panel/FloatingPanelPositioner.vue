<script setup lang="ts">
import { FloatingPanelPositioner as ArkFloatingPanelPositioner } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelPositionerProps } from '@ark-ui/vue/floating-panel';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';
import styles from './FloatingPanel.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelPositionerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <OverlayPortal>
    <ArkFloatingPanelPositioner
      :ref="forwardRef"
      v-bind="attrs"
      :class="clsx(styles.positioner, className)"
      data-slot="floating-panel-positioner"
    >
      <slot />
    </ArkFloatingPanelPositioner>
  </OverlayPortal>
</template>