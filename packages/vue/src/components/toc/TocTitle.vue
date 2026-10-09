<script setup lang="ts">
import { TocTitle as ArkTocTitle } from '@ark-ui/vue/toc';
import type { TocTitleProps } from '@ark-ui/vue/toc';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Toc.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocTitleProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTocTitle v-bind="attrs" :class="clsx(styles.title, className)" data-slot="toc-title">
    <slot />
  </ArkTocTitle>
</template>