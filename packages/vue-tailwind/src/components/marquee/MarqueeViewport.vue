<script setup lang="ts">
import { MarqueeViewport as ArkMarqueeViewport } from '@ark-ui/vue/marquee';
import type { MarqueeViewportProps } from '@ark-ui/vue/marquee';
import { useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ MarqueeViewportProps {}

defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkMarqueeViewport v-bind="attrs" data-slot="marquee-viewport">
    <slot />
  </ArkMarqueeViewport>
</template>