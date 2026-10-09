<script setup lang="ts">
import { TreeViewBranchContent as ArkTreeViewBranchContent } from '@ark-ui/vue/tree-view';
import type { TreeViewBranchContentProps } from '@ark-ui/vue/tree-view';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TreeView.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewBranchContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewBranchContent
    v-bind="attrs"
    :class="clsx(styles.branchContent, className)"
    data-slot="tree-view-branch-content"
    ><slot
  /></ArkTreeViewBranchContent>
</template>