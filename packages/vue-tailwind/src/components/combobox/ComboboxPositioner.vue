<script setup lang="ts">
import { ComboboxPositioner as ArkComboboxPositioner } from '@ark-ui/vue/combobox';
import type { ComboboxPositionerProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';

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
      :class="cn('z-[var(--z-index)] outline-0', className)"
      data-slot="combobox-positioner"
    >
      <slot />
    </ArkComboboxPositioner>
  </OverlayPortal>
</template>