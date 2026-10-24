<script setup lang="ts">
import { TabIndicator as ArkTabIndicator } from '@ark-ui/vue/tabs';
import type { TabIndicatorProps } from '@ark-ui/vue/tabs';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TabIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTabIndicator
    v-bind="attrs"
    :class="
      cn(
        'pointer-events-none top-(--top) left-(--left) -z-1 h-(--height) w-(--width) rounded-md bg-background shadow-sm [--transition-duration:var(--moduix-duration-normal)] [--transition-timing-function:var(--moduix-ease-in-out)] group-data-[variant=line]/tabs:rounded-full group-data-[variant=line]/tabs:bg-foreground group-data-[variant=line]/tabs:shadow-none group-data-[variant=line]/tabs:data-[orientation=horizontal]:top-auto group-data-[variant=line]/tabs:data-[orientation=horizontal]:bottom-0 group-data-[variant=line]/tabs:data-[orientation=horizontal]:h-0.5 group-data-[variant=line]/tabs:data-[orientation=vertical]:start-auto group-data-[variant=line]/tabs:data-[orientation=vertical]:end-0 group-data-[variant=line]/tabs:data-[orientation=vertical]:w-0.5',
        className,
      )
    "
    data-slot="tabs-indicator"
  >
    <slot />
  </ArkTabIndicator>
</template>