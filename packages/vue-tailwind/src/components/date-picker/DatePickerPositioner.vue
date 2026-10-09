<script setup lang="ts">
import { DatePickerPositioner as ArkDatePickerPositioner } from '@ark-ui/vue/date-picker';
import type { DatePickerPositionerProps } from '@ark-ui/vue/date-picker';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerPositionerProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <OverlayPortal>
    <ArkDatePickerPositioner
      v-bind="attrs"
      :class="cn('z-[var(--z-index)] outline-0', props.class)"
      data-slot="date-picker-positioner"
    >
      <slot />
    </ArkDatePickerPositioner>
  </OverlayPortal>
</template>