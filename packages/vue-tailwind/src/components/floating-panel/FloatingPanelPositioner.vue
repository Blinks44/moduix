<script setup lang="ts">
import { FloatingPanelPositioner as ArkFloatingPanelPositioner } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelPositionerProps } from '@ark-ui/vue/floating-panel';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelPositionerProps {}

defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <OverlayPortal>
    <ArkFloatingPanelPositioner
      :ref="forwardRef"
      v-bind="attrs"
      data-slot="floating-panel-positioner"
    >
      <slot />
    </ArkFloatingPanelPositioner>
  </OverlayPortal>
</template>