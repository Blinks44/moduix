<script setup lang="ts">
import { TocContent as ArkTocContent } from '@ark-ui/vue/toc';
import type { TocContentProps } from '@ark-ui/vue/toc';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Toc.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTocContent v-bind="attrs" :class="clsx(styles.content, className)" data-slot="toc-content">
    <slot />
  </ArkTocContent>
</template>