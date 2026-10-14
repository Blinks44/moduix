<script setup lang="ts">
import { ClipboardTrigger as ArkClipboardTrigger } from '@ark-ui/vue/clipboard';
import type { ClipboardTriggerProps } from '@ark-ui/vue/clipboard';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ClipboardTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const triggerClass =
  'box-border inline-flex min-h-control-md shrink-0 cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm leading-5 font-medium whitespace-nowrap text-foreground transition duration-200 ease-in-out select-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0 [&:active:not(:disabled)]:opacity-[0.94] [@media(hover:hover)]:[&:not(:disabled):hover]:bg-accent';
</script>

<template>
  <ArkClipboardTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="cn(!asChild && triggerClass, className)"
    data-slot="clipboard-trigger"
  >
    <slot />
  </ArkClipboardTrigger>
</template>