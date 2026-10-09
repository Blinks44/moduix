<script setup lang="ts">
import { TabList as ArkTabList } from '@ark-ui/vue/tabs';
import type { TabListProps } from '@ark-ui/vue/tabs';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tabs.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TabListProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTabList v-bind="attrs" :class="clsx(styles.list, className)" data-slot="tabs-list">
    <slot />
  </ArkTabList>
</template>