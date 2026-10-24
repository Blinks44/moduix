<script setup lang="ts">
import { ToastRoot as ArkToastRoot } from '@ark-ui/vue/toast';
import type { ToastRootProps } from '@ark-ui/vue/toast';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ToastRootProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  '[z-index:var(--z-index)] grid [height:var(--height)] w-80 max-w-[calc(100vw-2rem)] [translate:var(--x)_var(--y)] [scale:var(--scale)] items-start gap-1 rounded-lg border border-border bg-card bg-clip-padding p-4 text-card-foreground [opacity:var(--opacity)] shadow-lg transition-[translate,scale,opacity,height] duration-slow ease-[cubic-bezier(0.21,1.02,0.73,1)] [will-change:translate,opacity,scale] has-[[data-slot=toast-close-trigger]]:pe-11 data-[state=closed]:[transition:translate_var(--moduix-duration-slow)_cubic-bezier(0.06,0.71,0.55,1),scale_var(--moduix-duration-slow)_cubic-bezier(0.06,0.71,0.55,1),opacity_var(--moduix-duration-normal)_cubic-bezier(0.06,0.71,0.55,1)] data-[type=error]:border-destructive/35 data-[type=error]:bg-[color-mix(in_oklab,var(--color-destructive)_9%,var(--color-background))] data-[type=error]:text-foreground data-[type=success]:border-success/34 data-[type=success]:bg-[color-mix(in_oklab,var(--color-success)_10%,var(--color-background))] data-[type=success]:text-foreground data-[type=warning]:border-warning/38 data-[type=warning]:bg-[color-mix(in_oklab,var(--color-warning)_13%,var(--color-background))] data-[type=warning]:text-foreground [@media(max-width:40rem)]:inset-x-0 [@media(max-width:40rem)]:mx-auto [@media(max-width:40rem)]:max-w-full';
</script>

<template>
  <ArkToastRoot
    v-bind="attrs"
    :as-child="asChild"
    :class="cn(rootClass, className)"
    data-slot="toast-root"
  >
    <slot />
  </ArkToastRoot>
</template>