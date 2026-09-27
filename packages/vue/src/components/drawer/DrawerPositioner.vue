<script setup lang="ts">
import { DrawerPositioner as ArkDrawerPositioner } from '@ark-ui/vue/drawer';
import type { DrawerPositionerProps } from '@ark-ui/vue/drawer';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import OverlayPortal from '../../internal/overlayPortal/OverlayPortal.vue';
import styles from './Drawer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerPositionerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <OverlayPortal>
    <ArkDrawerPositioner
      :ref="forwardRef"
      v-bind="attrs"
      :class="clsx(styles.positioner, className)"
      data-slot="drawer-positioner"
    >
      <slot />
    </ArkDrawerPositioner>
  </OverlayPortal>
</template>
