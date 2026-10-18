<script setup lang="ts">
import { DialogContent as ArkDialogContent } from '@ark-ui/vue/dialog';
import type { DialogContentProps } from '@ark-ui/vue/dialog';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type DialogPlacement = 'center' | 'top' | 'bottom';
export type DialogScrollBehavior = 'outside' | 'inside';

export interface Props extends /* @vue-ignore */ DialogContentProps {
  class?: HTMLAttributes['class'];
  /** Width preset. `full` covers the viewport. */
  size?: DialogSize;
  /** Vertical position inside the positioner. */
  placement?: DialogPlacement;
  /** `outside` scrolls the positioner; `inside` caps the content and scrolls `DialogBody`. */
  scrollBehavior?: DialogScrollBehavior;
}

const {
  class: className,
  placement = 'center',
  scrollBehavior = 'outside',
  size = 'md',
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDialogContent
    v-bind="attrs"
    :class="
      cn(
        `relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] w-[min(28rem,calc(100vw-2rem))] max-w-full origin-top rounded-lg border border-border bg-popover p-6 text-popover-foreground shadow-lg outline-0 transition-[scale,translate] duration-normal ease-in-out after:pointer-events-none after:absolute after:inset-0 after:z-1 after:rounded-[inherit] after:bg-black/5 after:opacity-0 after:transition-opacity after:duration-normal after:ease-in-out after:content-[''] data-[has-nested]:[translate:0_calc(2.5rem*var(--nested-layer-count,0))] data-[has-nested]:[scale:calc(1-0.05*var(--nested-layer-count,0))] data-[has-nested]:after:opacity-100 data-[placement=bottom]:self-end data-[placement=top]:self-start data-[scroll-behavior=inside]:flex data-[scroll-behavior=inside]:max-h-[calc(100dvh-2rem)] data-[scroll-behavior=inside]:flex-col data-[size=full]:min-h-full data-[size=full]:w-full data-[size=full]:max-w-none data-[size=full]:rounded-none data-[size=full]:border-0 data-[size=full]:data-[scroll-behavior=inside]:max-h-dvh data-[size=lg]:w-[min(32rem,calc(100vw-2rem))] data-[size=sm]:w-[min(24rem,calc(100vw-2rem))] data-[size=xl]:w-[min(36rem,calc(100vw-2rem))] data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none [&:has([data-slot=dialog-close-icon])_[data-slot=dialog-title]]:pe-7 data-[scroll-behavior=inside]:[&>[data-slot=dialog-body]]:min-h-0 data-[scroll-behavior=inside]:[&>[data-slot=dialog-body]]:flex-auto data-[scroll-behavior=inside]:[&>[data-slot=dialog-body]]:overflow-y-auto`,
        className,
      )
    "
    :data-size="size"
    :data-placement="placement"
    :data-scroll-behavior="scrollBehavior"
    data-slot="dialog-content"
  >
    <slot />
  </ArkDialogContent>
</template>