<script setup lang="ts">
import { TreeViewItemText as ArkTreeViewItemText } from '@ark-ui/vue/tree-view';
import type { TreeViewItemTextProps } from '@ark-ui/vue/tree-view';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TreeView.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewItemTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewItemText
    v-bind="attrs"
    :class="clsx(styles.itemText, className)"
    data-slot="tree-view-item-text"
    ><slot
  /></ArkTreeViewItemText>
</template>