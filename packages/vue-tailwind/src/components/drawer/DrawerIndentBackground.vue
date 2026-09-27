<script setup lang="ts">
import { DrawerIndentBackground as ArkDrawerIndentBackground } from '@ark-ui/vue/drawer';
import type { DrawerIndentBackgroundProps } from '@ark-ui/vue/drawer';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerIndentBackgroundProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const indentBackgroundClass =
  'pointer-events-none absolute inset-0 bg-foreground opacity-0 transition-opacity duration-[450ms] ease-spring data-active:opacity-[calc(1-var(--drawer-swipe-progress,0))] motion-reduce:[transition-duration:1ms]';
</script>

<template>
  <ArkDrawerIndentBackground
    v-bind="attrs"
    :class="cn(indentBackgroundClass, className)"
    data-slot="drawer-indent-background"
  >
    <slot />
  </ArkDrawerIndentBackground>
</template>
