<script setup lang="ts">
import { TreeViewItem as ArkTreeViewItem } from '@ark-ui/vue/tree-view';
import type { TreeViewItemProps } from '@ark-ui/vue/tree-view';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TreeView.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewItemProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewItem v-bind="attrs" :class="clsx(styles.item, className)" data-slot="tree-view-item"
    ><slot
  /></ArkTreeViewItem>
</template>