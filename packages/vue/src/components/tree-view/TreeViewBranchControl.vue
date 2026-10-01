<script setup lang="ts">
import { TreeViewBranchControl as ArkTreeViewBranchControl } from '@ark-ui/vue/tree-view';
import type { TreeViewBranchControlProps } from '@ark-ui/vue/tree-view';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TreeView.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewBranchControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewBranchControl
    v-bind="attrs"
    :class="clsx(styles.branchControl, className)"
    data-slot="tree-view-branch-control"
    ><slot
  /></ArkTreeViewBranchControl>
</template>