<script setup lang="ts">
import { DrawerIndent as ArkDrawerIndent } from '@ark-ui/vue/drawer';
import type { DrawerIndentProps } from '@ark-ui/vue/drawer';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerIndentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const indentClass =
  'relative origin-top [translate:0_0] [scale:1] transition-[transform,border-radius] duration-[450ms] ease-spring data-active:[translate:0_calc(8px*(1-var(--drawer-swipe-progress,0)))] data-active:[scale:calc(0.97+(1-0.97)*var(--drawer-swipe-progress,0))] data-active:rounded-t-lg data-active:rounded-b-none motion-reduce:[transition-duration:1ms]';
</script>

<template>
  <ArkDrawerIndent v-bind="attrs" :class="cn(indentClass, className)" data-slot="drawer-indent">
    <slot />
  </ArkDrawerIndent>
</template>
