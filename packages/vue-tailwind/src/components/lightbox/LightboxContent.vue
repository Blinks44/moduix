<script setup lang="ts">
import { DialogContent as ArkDialogContent } from '@ark-ui/vue/dialog';
import type { DialogContentProps } from '@ark-ui/vue/dialog';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DialogContentProps {
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
        'relative box-border grid max-h-[min(80dvh,calc(100dvh-2rem))] w-fit max-w-[min(80vw,calc(100vw-2rem))] gap-3 border-0 bg-transparent outline-0 data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
        className,
      )
    "
    data-slot="lightbox-content"
  >
    <slot />
  </ArkDialogContent>
</template>