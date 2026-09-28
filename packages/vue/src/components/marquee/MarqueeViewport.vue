<script setup lang="ts">
import { MarqueeViewport as ArkMarqueeViewport } from '@ark-ui/vue/marquee';
import type { MarqueeViewportProps } from '@ark-ui/vue/marquee';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Marquee.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ MarqueeViewportProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkMarqueeViewport
    v-bind="attrs"
    :class="clsx(styles.viewport, className)"
    data-slot="marquee-viewport"
  >
    <slot />
  </ArkMarqueeViewport>
</template>