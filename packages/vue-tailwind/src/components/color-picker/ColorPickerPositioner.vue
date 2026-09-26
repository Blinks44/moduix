<script setup lang="ts">
import { ColorPickerPositioner as ArkColorPickerPositioner } from '@ark-ui/vue/color-picker';
import type { ColorPickerPositionerProps } from '@ark-ui/vue/color-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';

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
      :class="cn('z-[var(--z-index)] outline-0', className)"
      data-slot="color-picker-positioner"
    >
      <slot />
    </ArkColorPickerPositioner>
  </OverlayPortal>
</template>