<script setup lang="ts">
import { SelectPositioner as ArkSelectPositioner } from '@ark-ui/vue/select';
import type { SelectPositionerProps } from '@ark-ui/vue/select';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';
import styles from './Select.module.css';

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
      :class="clsx(styles.positioner, className)"
      data-slot="select-positioner"
    >
      <slot />
    </ArkSelectPositioner>
  </OverlayPortal>
</template>