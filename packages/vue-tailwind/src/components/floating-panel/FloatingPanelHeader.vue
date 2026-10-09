<script setup lang="ts">
import { FloatingPanelHeader as ArkFloatingPanelHeader } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelHeaderProps } from '@ark-ui/vue/floating-panel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelHeaderProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const headerClass =
  'box-border flex min-h-control-xl cursor-grab items-center justify-between gap-3 border-b border-border bg-muted px-3 py-2 select-none data-[dragging]:cursor-grabbing data-[minimized]:border-b-transparent';
</script>

<template>
  <ArkFloatingPanelHeader
    v-bind="attrs"
    :class="cn(headerClass, className)"
    data-slot="floating-panel-header"
  >
    <slot />
  </ArkFloatingPanelHeader>
</template>