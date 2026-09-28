<script setup lang="ts">
import { MarqueeContent as ArkMarqueeContent } from '@ark-ui/vue/marquee';
import type { MarqueeContentProps } from '@ark-ui/vue/marquee';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Marquee.module.css';

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
    :class="clsx(styles.content, className)"
    data-slot="marquee-content"
  >
    <slot />
  </ArkMarqueeContent>
</template>