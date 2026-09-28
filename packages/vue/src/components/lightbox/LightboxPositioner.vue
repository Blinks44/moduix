<script setup lang="ts">
import { DialogPositioner as ArkDialogPositioner } from '@ark-ui/vue/dialog';
import type { DialogPositionerProps } from '@ark-ui/vue/dialog';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';
import styles from './Lightbox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DialogPositionerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <OverlayPortal>
    <ArkDialogPositioner
      :ref="forwardRef"
      v-bind="attrs"
      :class="clsx(styles.positioner, className)"
      data-slot="lightbox-positioner"
    >
      <slot />
    </ArkDialogPositioner>
  </OverlayPortal>
</template>