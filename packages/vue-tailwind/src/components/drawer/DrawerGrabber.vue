<script setup lang="ts">
import { DrawerGrabber as ArkDrawerGrabber } from '@ark-ui/vue/drawer';
import type { DrawerGrabberProps } from '@ark-ui/vue/drawer';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerGrabberProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const grabberClass =
  'group/grabber flex w-full shrink-0 cursor-grab items-center justify-center pb-1 select-none group-data-[swipe-direction=left]/drawer:hidden group-data-[swipe-direction=right]/drawer:hidden active:cursor-grabbing';
</script>

<template>
  <ArkDrawerGrabber v-bind="attrs" :class="cn(grabberClass, className)" data-slot="drawer-grabber">
    <slot />
  </ArkDrawerGrabber>
</template>