<script setup lang="ts">
import { TreeViewBranchText as ArkTreeViewBranchText } from '@ark-ui/vue/tree-view';
import type { TreeViewBranchTextProps } from '@ark-ui/vue/tree-view';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TreeView.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewBranchTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewBranchText
    v-bind="attrs"
    :class="clsx(styles.branchText, className)"
    data-slot="tree-view-branch-text"
    ><slot
  /></ArkTreeViewBranchText>
</template>