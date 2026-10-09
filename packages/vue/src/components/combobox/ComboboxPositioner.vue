<script setup lang="ts">
import { ComboboxPositioner as ArkComboboxPositioner } from '@ark-ui/vue/combobox';
import type { ComboboxPositionerProps } from '@ark-ui/vue/combobox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';
import styles from './Combobox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxPositionerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <OverlayPortal>
    <ArkComboboxPositioner
      v-bind="attrs"
      :class="clsx(styles.positioner, className)"
      data-slot="combobox-positioner"
    >
      <slot />
    </ArkComboboxPositioner>
  </OverlayPortal>
</template>