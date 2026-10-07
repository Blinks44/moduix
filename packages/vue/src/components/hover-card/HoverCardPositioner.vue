<script setup lang="ts">
import { HoverCardPositioner as ArkHoverCardPositioner } from '@ark-ui/vue/hover-card';
import type { HoverCardPositionerProps } from '@ark-ui/vue/hover-card';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';
import styles from './HoverCard.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HoverCardPositionerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <OverlayPortal>
    <ArkHoverCardPositioner
      :ref="forwardRef"
      v-bind="attrs"
      :class="clsx(styles.positioner, className)"
      data-slot="hover-card-positioner"
    >
      <slot />
    </ArkHoverCardPositioner>
  </OverlayPortal>
</template>