<script setup lang="ts">
import { MenuPositioner as ArkMenuPositioner, type MenuPositionerProps } from '@ark-ui/vue/menu';
import { clsx } from 'clsx';
import { useAttrs, type HTMLAttributes } from 'vue';
import OverlayPortal from '../../internal/overlayPortal/OverlayPortal.vue';
import styles from '../menu/Menu.module.css';

defineOptions({ inheritAttrs: false });
interface Props extends /* @vue-ignore */ MenuPositionerProps {
  class?: HTMLAttributes['class'];
}
const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <OverlayPortal>
    <ArkMenuPositioner
      v-bind="attrs"
      :class="clsx(styles.positioner, className)"
      data-slot="split-button-positioner"
    >
      <slot />
    </ArkMenuPositioner>
  </OverlayPortal>
</template>