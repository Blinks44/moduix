<script setup lang="ts">
import { DrawerSwipeArea as ArkDrawerSwipeArea } from '@ark-ui/vue/drawer';
import type { DrawerSwipeAreaProps } from '@ark-ui/vue/drawer';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerSwipeAreaProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const swipeAreaClass =
  'fixed z-50 touch-none data-disabled:pointer-events-none data-[swipe-direction=down]:start-0 data-[swipe-direction=down]:end-0 data-[swipe-direction=down]:top-0 data-[swipe-direction=down]:h-10 data-[swipe-direction=left]:end-0 data-[swipe-direction=left]:top-0 data-[swipe-direction=left]:bottom-0 data-[swipe-direction=left]:w-10 data-[swipe-direction=right]:start-0 data-[swipe-direction=right]:top-0 data-[swipe-direction=right]:bottom-0 data-[swipe-direction=right]:w-10 data-[swipe-direction=up]:start-0 data-[swipe-direction=up]:end-0 data-[swipe-direction=up]:bottom-0 data-[swipe-direction=up]:h-10';
</script>

<template>
  <ArkDrawerSwipeArea
    v-bind="attrs"
    :class="cn(swipeAreaClass, className)"
    data-slot="drawer-swipe-area"
  >
    <slot />
  </ArkDrawerSwipeArea>
</template>