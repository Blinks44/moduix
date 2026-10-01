<script setup lang="ts">
import { TocList as ArkTocList } from '@ark-ui/vue/toc';
import type { TocListProps } from '@ark-ui/vue/toc';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Toc.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocListProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTocList v-bind="attrs" :class="clsx(styles.list, className)" data-slot="toc-list">
    <slot />
  </ArkTocList>
</template>