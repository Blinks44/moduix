<script setup lang="ts">
import { FloatingPanelContent as ArkFloatingPanelContent } from '@ark-ui/vue/floating-panel';
import type { FloatingPanelContentProps } from '@ark-ui/vue/floating-panel';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ FloatingPanelContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const contentClass =
  'relative box-border flex min-h-40 min-w-64 origin-[var(--transform-origin)] flex-col overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg outline-0 data-behind:opacity-[0.55] data-minimized:min-h-0 data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none';
</script>

<template>
  <ArkFloatingPanelContent
    v-bind="attrs"
    :class="cn(contentClass, className)"
    data-slot="floating-panel-content"
  >
    <slot />
  </ArkFloatingPanelContent>
</template>