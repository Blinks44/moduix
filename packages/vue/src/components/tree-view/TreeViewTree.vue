<script setup lang="ts">
import { TreeViewTree as ArkTreeViewTree } from '@ark-ui/vue/tree-view';
import type { TreeViewTreeProps } from '@ark-ui/vue/tree-view';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TreeView.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewTreeProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewTree v-bind="attrs" :class="clsx(styles.tree, className)" data-slot="tree-view-tree"
    ><slot
  /></ArkTreeViewTree>
</template>