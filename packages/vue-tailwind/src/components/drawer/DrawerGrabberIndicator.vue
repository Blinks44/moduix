<script setup lang="ts">
import { DrawerGrabberIndicator as ArkDrawerGrabberIndicator } from '@ark-ui/vue/drawer';
import type { DrawerGrabberIndicatorProps } from '@ark-ui/vue/drawer';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerGrabberIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const grabberIndicatorClass =
  'h-1 w-12 rounded-full bg-muted-foreground opacity-[0.45] transition-[background-color,opacity] duration-200 ease-in-out motion-reduce:transition-none [@media(hover:hover)]:group-hover/grabber:opacity-70';
</script>

<template>
  <ArkDrawerGrabberIndicator
    v-bind="attrs"
    :class="cn(grabberIndicatorClass, className)"
    data-slot="drawer-grabber-indicator"
  >
    <slot />
  </ArkDrawerGrabberIndicator>
</template>