<script setup lang="ts">
import { TabIndicator as ArkTabIndicator } from '@ark-ui/vue/tabs';
import type { TabIndicatorProps } from '@ark-ui/vue/tabs';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tabs.module.css';

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
    :class="clsx(styles.indicator, className)"
    data-slot="tabs-indicator"
  >
    <slot />
  </ArkTabIndicator>
</template>