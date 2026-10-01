<script setup lang="ts">
import { TocNav as ArkTocNav } from '@ark-ui/vue/toc';
import type { TocNavProps } from '@ark-ui/vue/toc';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Toc.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocNavProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTocNav v-bind="attrs" :class="clsx(styles.nav, className)" data-slot="toc-nav">
    <slot />
  </ArkTocNav>
</template>