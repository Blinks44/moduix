<script setup lang="ts">
import { SignaturePadControl as ArkSignaturePadControl } from '@ark-ui/vue/signature-pad';
import type { SignaturePadControlProps } from '@ark-ui/vue/signature-pad';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SignaturePadControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSignaturePadControl
    v-bind="attrs"
    :class="
      cn(
        'box-border h-40 min-h-40 w-full min-w-0 overflow-hidden rounded-md border border-border bg-background text-foreground shadow-sm transition-[border-color,box-shadow,opacity] duration-200 ease-in-out outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring data-disabled:cursor-not-allowed motion-reduce:transition-none',
        className,
      )
    "
    data-slot="signature-pad-control"
  >
    <slot />
  </ArkSignaturePadControl>
</template>