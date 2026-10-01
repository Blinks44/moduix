<script setup lang="ts">
import { TocItem as ArkTocItem } from '@ark-ui/vue/toc';
import type { TocItemProps } from '@ark-ui/vue/toc';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Toc.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocItemProps {
  class?: HTMLAttributes['class'];
  item: TocItemProps['item'];
}

const { class: className, item } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTocItem
    v-bind="attrs"
    :class="clsx(styles.item, className)"
    :item="item"
    data-slot="toc-item"
  >
    <slot />
  </ArkTocItem>
</template>