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
  'relative origin-top [transform:translateY(0)_scale(1)] [transition:transform_var(--moduix-drawer-indent-transition,var(--moduix-transition-spring)),border-radius_var(--moduix-drawer-indent-transition,var(--moduix-transition-spring))] data-active:[transform:translateY(calc(var(--moduix-drawer-indent-translate-y-active,var(--moduix-spacing-2))*(1-var(--drawer-swipe-progress,0))))_scale(calc(var(--moduix-drawer-indent-scale-active,0.97)+(1-var(--moduix-drawer-indent-scale-active,0.97))*var(--drawer-swipe-progress,0)))] data-active:[border-radius:var(--moduix-drawer-indent-radius-active,var(--moduix-radius-lg))_var(--moduix-drawer-indent-radius-active,var(--moduix-radius-lg))_0_0] motion-reduce:[transition-duration:1ms]';
</script>

<template>
  <ArkDrawerIndent v-bind="attrs" :class="cn(indentClass, className)" data-slot="drawer-indent">
    <slot />
  </ArkDrawerIndent>
</template>