<script setup lang="ts">
import { MenuPositioner as ArkMenuPositioner, type MenuPositionerProps } from '@ark-ui/vue/menu';
import { useAttrs, type HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import OverlayPortal from '../../internal/overlayPortal/OverlayPortal.vue';
import { menuPositionerVariants } from '../menu/Menu.variants';

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
      :class="cn(menuPositionerVariants(), className)"
      data-slot="split-button-positioner"
    >
      <slot />
    </ArkMenuPositioner>
  </OverlayPortal>
</template>