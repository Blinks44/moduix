<script setup lang="ts">
import { DrawerBackdrop as ArkDrawerBackdrop } from '@ark-ui/vue/drawer';
import type { DrawerBackdropProps } from '@ark-ui/vue/drawer';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import OverlayPortal from '../../internal/overlayPortal/OverlayPortal.vue';
import styles from './Drawer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerBackdropProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <OverlayPortal>
    <ArkDrawerBackdrop
      :ref="forwardRef"
      v-bind="attrs"
      :class="clsx(styles.backdrop, className)"
      data-slot="drawer-backdrop"
    >
      <slot />
    </ArkDrawerBackdrop>
  </OverlayPortal>
</template>
