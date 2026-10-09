<script setup lang="ts">
import { ScrollAreaThumb as ArkScrollAreaThumb } from '@ark-ui/vue/scroll-area';
import type { ScrollAreaThumbProps } from '@ark-ui/vue/scroll-area';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ScrollAreaThumbProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const thumbClass =
  'rounded-full bg-border data-[orientation=horizontal]:h-full data-[orientation=horizontal]:min-w-control-xs data-[orientation=vertical]:min-h-control-xs data-[orientation=vertical]:w-full forced-colors:bg-[ButtonText]';
</script>

<template>
  <ArkScrollAreaThumb
    v-bind="attrs"
    :class="cn(thumbClass, className)"
    data-slot="scroll-area-thumb"
  >
    <slot />
  </ArkScrollAreaThumb>
</template>