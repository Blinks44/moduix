<script setup lang="ts">
import { MarqueeItem as ArkMarqueeItem } from '@ark-ui/vue/marquee';
import type { MarqueeItemProps } from '@ark-ui/vue/marquee';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Marquee.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ MarqueeItemProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkMarqueeItem v-bind="attrs" :class="clsx(styles.item, className)" data-slot="marquee-item">
    <slot />
  </ArkMarqueeItem>
</template>