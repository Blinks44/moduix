<script setup lang="ts">
import { DrawerContent as ArkDrawerContent } from '@ark-ui/vue/drawer';
import type { DrawerContentProps } from '@ark-ui/vue/drawer';
import { computed, inject, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { DrawerVariantContextKey, type DrawerVariant } from './context';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerContentProps {
  class?: HTMLAttributes['class'];
  variant?: DrawerVariant;
}

const { class: className, variant } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const context = inject(DrawerVariantContextKey, { variant: () => undefined });
const rootVariant = computed(() => context.variant());
const contentClass =
  "group/drawer relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] box-border flex h-full max-h-[80dvh] w-full max-w-[100vw] origin-bottom [translate:0_0] [scale:1] flex-col overscroll-contain rounded-t-xl rounded-b-none border border-border bg-popover px-6 pt-3 pb-[calc(var(--moduix-spacing-4)+env(safe-area-inset-bottom,0px))] text-popover-foreground shadow-lg outline-0 [--_drawer-bleed:var(--moduix-size-xl)] [--drawer-island-translate-distance:0px] [transition:transform_calc(var(--drawer-swipe-strength,1)*var(--moduix-duration-slower))_cubic-bezier(0,0,0.2,1),scale_var(--moduix-duration-slower)_cubic-bezier(0.32,0.72,0,1),translate_var(--moduix-duration-slower)_cubic-bezier(0.32,0.72,0,1)] after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-[var(--_drawer-bleed)] after:bg-inherit after:content-[''] data-dragging:select-none data-nested-drawer-swiping:[transition-duration:0s] data-[nested-drawer-open]:[scale:calc(1-0.05*var(--nested-drawers,0))] data-[state=closed]:animate-moduix-drawer-content-out-down data-[state=open]:animate-moduix-drawer-content-in-down data-[state=open]:data-swiping:[transition-duration:0s] data-[swipe-direction=down]:data-[nested-drawer-open]:[translate:0_calc(-1*var(--moduix-spacing-10)*var(--nested-drawers,0))] data-[swipe-direction=left]:h-full data-[swipe-direction=left]:max-h-none data-[swipe-direction=left]:w-[min(22rem,calc(100vw-var(--moduix-spacing-8)))] data-[swipe-direction=left]:origin-left data-[swipe-direction=left]:rounded-s-none data-[swipe-direction=left]:rounded-e-xl data-[swipe-direction=left]:p-6 data-[swipe-direction=left]:after:inset-x-auto data-[swipe-direction=left]:after:inset-y-0 data-[swipe-direction=left]:after:top-0 data-[swipe-direction=left]:after:right-full data-[swipe-direction=left]:after:h-auto data-[swipe-direction=left]:after:w-[var(--_drawer-bleed)] data-[swipe-direction=left]:data-[nested-drawer-open]:[translate:calc(var(--moduix-spacing-10)*var(--nested-drawers,0))_0] data-[swipe-direction=left]:data-[state=closed]:animate-moduix-drawer-content-out-left data-[swipe-direction=left]:data-[state=open]:animate-moduix-drawer-content-in-left data-[swipe-direction=right]:h-full data-[swipe-direction=right]:max-h-none data-[swipe-direction=right]:w-[min(22rem,calc(100vw-var(--moduix-spacing-8)))] data-[swipe-direction=right]:origin-right data-[swipe-direction=right]:rounded-s-xl data-[swipe-direction=right]:rounded-e-none data-[swipe-direction=right]:p-6 data-[swipe-direction=right]:after:inset-x-auto data-[swipe-direction=right]:after:inset-y-0 data-[swipe-direction=right]:after:top-0 data-[swipe-direction=right]:after:left-full data-[swipe-direction=right]:after:h-auto data-[swipe-direction=right]:after:w-[var(--_drawer-bleed)] data-[swipe-direction=right]:data-[nested-drawer-open]:[translate:calc(-1*var(--moduix-spacing-10)*var(--nested-drawers,0))_0] data-[swipe-direction=right]:data-[state=closed]:animate-moduix-drawer-content-out-right data-[swipe-direction=right]:data-[state=open]:animate-moduix-drawer-content-in-right data-[swipe-direction=up]:origin-top data-[swipe-direction=up]:rounded-t-none data-[swipe-direction=up]:rounded-b-xl data-[swipe-direction=up]:pt-[calc(var(--moduix-spacing-4)+env(safe-area-inset-top,0px))] data-[swipe-direction=up]:pb-4 data-[swipe-direction=up]:after:top-auto data-[swipe-direction=up]:after:bottom-full data-[swipe-direction=up]:data-[nested-drawer-open]:[translate:0_calc(var(--moduix-spacing-10)*var(--nested-drawers,0))] data-[swipe-direction=up]:data-[state=closed]:animate-moduix-drawer-content-out-up data-[swipe-direction=up]:data-[state=open]:animate-moduix-drawer-content-in-up data-[variant=island]:rounded-xl data-[variant=island]:after:hidden data-[variant=island]:data-[swipe-direction=down]:[--drawer-island-translate-distance:max(var(--moduix-spacing-4),env(safe-area-inset-bottom,0px))] data-[variant=island]:data-[swipe-direction=left]:[--drawer-island-translate-distance:max(var(--moduix-spacing-4),env(safe-area-inset-left,0px))] data-[variant=island]:data-[swipe-direction=right]:[--drawer-island-translate-distance:max(var(--moduix-spacing-4),env(safe-area-inset-right,0px))] data-[variant=island]:data-[swipe-direction=up]:[--drawer-island-translate-distance:max(var(--moduix-spacing-4),env(safe-area-inset-top,0px))] motion-reduce:[transition-duration:1ms] motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]";
</script>

<template>
  <ArkDrawerContent
    v-bind="attrs"
    :class="cn(contentClass, className)"
    :data-variant="variant ?? rootVariant"
    data-slot="drawer-content"
  >
    <slot />
  </ArkDrawerContent>
</template>