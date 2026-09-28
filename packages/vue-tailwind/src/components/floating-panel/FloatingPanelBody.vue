<script setup lang="ts">
import { FloatingPanelBody as ArkFloatingPanelBody } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelBodyProps } from '@ark-ui/vue/floating-panel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelBodyProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFloatingPanelBody
    v-bind="attrs"
    :class="
      cn(
        'min-h-0 flex-auto overflow-auto p-4 text-sm text-popover-foreground data-minimized:hidden',
        className,
      )
    "
    data-slot="floating-panel-body"
  >
    <slot />
  </ArkFloatingPanelBody>
</template>