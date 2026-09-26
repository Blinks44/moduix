<script setup lang="ts">
import { MenuPositioner as ArkMenuPositioner } from '@ark-ui/vue/menu';
import type { MenuPositionerProps } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import OverlayPortal from '../../internal/overlayPortal/OverlayPortal.vue';
import { menuPositionerVariants } from './Menu.variants';

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
      data-slot="menu-positioner"
    >
      <slot />
    </ArkMenuPositioner>
  </OverlayPortal>
</template>