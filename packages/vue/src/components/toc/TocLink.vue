<script setup lang="ts">
import { TocLink as ArkTocLink } from '@ark-ui/vue/toc';
import type { TocLinkProps } from '@ark-ui/vue/toc';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Toc.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocLinkProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTocLink v-bind="attrs" :class="clsx(styles.link, className)" data-slot="toc-link">
    <slot />
  </ArkTocLink>
</template>