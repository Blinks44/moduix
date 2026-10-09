<script setup lang="ts">
import { MarqueeEdge as ArkMarqueeEdge } from '@ark-ui/vue/marquee';
import type { MarqueeEdgeProps } from '@ark-ui/vue/marquee';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Marquee.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ MarqueeEdgeProps {
  class?: HTMLAttributes['class'];
  side: MarqueeEdgeProps['side'];
}

const { class: className, side } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkMarqueeEdge
    v-bind="attrs"
    :class="clsx(styles.edge, className)"
    :side="side"
    data-slot="marquee-edge"
  >
    <slot />
  </ArkMarqueeEdge>
</template>