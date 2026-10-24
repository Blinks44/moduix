<script setup lang="ts">
import { MarqueeContent as ArkMarqueeContent } from '@ark-ui/vue/marquee';
import type { MarqueeContentProps } from '@ark-ui/vue/marquee';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ MarqueeContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkMarqueeContent
    v-bind="attrs"
    :class="
      cn(
        'animate-moduix-marquee-x group-data-paused:[animation-play-state:paused] data-reverse:[animation-direction:reverse] data-[orientation=vertical]:animate-moduix-marquee-y motion-reduce:data-[orientation]:animate-none',
        className,
      )
    "
    data-slot="marquee-content"
  >
    <slot />
  </ArkMarqueeContent>
</template>