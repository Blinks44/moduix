<script setup lang="ts">
import { TocIndicator as ArkTocIndicator } from '@ark-ui/vue/toc';
import type { TocIndicatorProps } from '@ark-ui/vue/toc';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Toc.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTocIndicator
    v-bind="attrs"
    :class="clsx(styles.indicator, className)"
    data-slot="toc-indicator"
  >
    <slot />
  </ArkTocIndicator>
</template>