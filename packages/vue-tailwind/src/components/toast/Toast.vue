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
  'group/toast pointer-events-auto [z-index:var(--z-index)] box-border grid [height:var(--height)] min-h-0 w-80 max-w-[calc(100vw-2rem)] min-w-0 [translate:var(--x)_var(--y)] [scale:var(--scale)] items-start gap-1 rounded-lg border border-border bg-card bg-clip-padding p-4 pe-11 text-card-foreground [opacity:var(--opacity)] shadow-lg transition-[translate,scale,opacity,height,box-shadow] duration-350 ease-[cubic-bezier(0.21,1.02,0.73,1)] [will-change:translate,opacity,scale] data-[state=closed]:[transition:translate_350ms_cubic-bezier(0.06,0.71,0.55,1),scale_350ms_cubic-bezier(0.06,0.71,0.55,1),opacity_200ms_cubic-bezier(0.06,0.71,0.55,1)] data-[type=error]:border-destructive/35 data-[type=error]:bg-destructive/9 data-[type=error]:text-foreground data-[type=success]:border-success/34 data-[type=success]:bg-success/10 data-[type=success]:text-foreground data-[type=warning]:border-warning/38 data-[type=warning]:bg-warning/13 data-[type=warning]:text-foreground motion-reduce:transition-none motion-reduce:data-[state=closed]:[transition:none] max-[40rem]:inset-x-0 max-[40rem]:w-[calc(100%_-_(var(--gap)*2))] max-[40rem]:max-w-none';
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