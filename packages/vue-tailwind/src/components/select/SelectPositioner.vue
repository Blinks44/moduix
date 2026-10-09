<script setup lang="ts">
import { SelectPositioner as ArkSelectPositioner } from '@ark-ui/vue/select';
import type { SelectPositionerProps } from '@ark-ui/vue/select';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectPositionerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <OverlayPortal>
    <ArkSelectPositioner
      v-bind="attrs"
      :class="cn('z-[var(--z-index)] outline-0', className)"
      data-slot="select-positioner"
    >
      <slot />
    </ArkSelectPositioner>
  </OverlayPortal>
</template>