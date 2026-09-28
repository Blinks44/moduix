<script setup lang="ts">
import { FloatingPanelTitle as ArkFloatingPanelTitle } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelTitleProps } from '@ark-ui/vue/floating-panel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelTitleProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkFloatingPanelTitle
    v-bind="attrs"
    :class="
      cn(
        'inline-flex min-w-0 items-center gap-2 text-sm font-semibold text-popover-foreground',
        className,
      )
    "
    data-slot="floating-panel-title"
  >
    <slot />
  </ArkFloatingPanelTitle>
</template>