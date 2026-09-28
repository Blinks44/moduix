<script setup lang="ts">
import { MarqueeRoot as ArkMarqueeRoot } from '@ark-ui/vue/marquee';
import type { MarqueeRootEmits, MarqueeRootProps } from '@ark-ui/vue/marquee';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Marquee.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ MarqueeRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ MarqueeRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkMarqueeRoot v-bind="attrs" :class="clsx(styles.root, className)" data-slot="marquee-root">
    <slot />
  </ArkMarqueeRoot>
</template>