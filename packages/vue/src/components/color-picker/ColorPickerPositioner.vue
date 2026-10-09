<script setup lang="ts">
import { ColorPickerPositioner as ArkColorPickerPositioner } from '@ark-ui/vue/color-picker';
import type { ColorPickerPositionerProps } from '@ark-ui/vue/color-picker';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';
import styles from './ColorPicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ColorPickerPositionerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <OverlayPortal>
    <ArkColorPickerPositioner
      v-bind="attrs"
      :class="clsx(styles.positioner, className)"
      data-slot="color-picker-positioner"
    >
      <slot />
    </ArkColorPickerPositioner>
  </OverlayPortal>
</template>