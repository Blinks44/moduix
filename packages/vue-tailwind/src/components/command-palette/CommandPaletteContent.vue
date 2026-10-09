<script setup lang="ts">
import { DialogContent as ArkDialogContent } from '@ark-ui/vue/dialog';
import type { DialogContentProps } from '@ark-ui/vue/dialog';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ DialogContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkDialogContent
    v-bind="attrs"
    :class="
      cn(
        'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] flex max-h-[min(34rem,calc(100dvh-5rem))] w-[min(37.5rem,calc(100vw-2rem))] origin-top flex-col overflow-hidden rounded-lg border border-border/84 bg-popover bg-linear-to-b from-white/4 to-transparent text-popover-foreground shadow-lg outline-0 data-[state=closed]:animate-moduix-command-palette-content-out data-[state=open]:animate-moduix-command-palette-content-in motion-reduce:animate-none',
        className,
      )
    "
    data-slot="command-palette-content"
  >
    <slot />
  </ArkDialogContent>
</template>