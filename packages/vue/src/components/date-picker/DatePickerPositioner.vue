<script setup lang="ts">
import { DatePickerPositioner as ArkDatePickerPositioner } from '@ark-ui/vue/date-picker';
import type { DatePickerPositionerProps } from '@ark-ui/vue/date-picker';
import { clsx } from 'clsx';
import type { HTMLAttributes } from 'vue';
import { useAttrs } from 'vue';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';
import styles from './DatePicker.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DatePickerPositionerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <OverlayPortal>
    <ArkDatePickerPositioner
      v-bind="attrs"
      :class="clsx(styles.positioner, className)"
      data-slot="date-picker-positioner"
    >
      <slot />
    </ArkDatePickerPositioner>
  </OverlayPortal>
</template>