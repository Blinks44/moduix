<script lang="ts">
import type {
  TreeNode,
  TreeViewCheckedChangeDetails,
  TreeViewExpandedChangeDetails,
  TreeViewFocusChangeDetails,
  TreeViewLoadChildrenCompleteDetails,
  TreeViewLoadChildrenErrorDetails,
  TreeViewRenameCompleteDetails,
  TreeViewRenameStartDetails,
  TreeViewRootProps,
  TreeViewSelectionChangeDetails,
} from '@ark-ui/vue/tree-view';
import type { HTMLAttributes } from 'vue';

export interface Props<T extends TreeNode> extends /* @vue-ignore */ TreeViewRootProps<T> {
  class?: HTMLAttributes['class'];
  collection: TreeViewRootProps<T>['collection'];
}

export interface TreeViewRootEmits<T extends TreeNode> {
  expandedChange: [details: TreeViewExpandedChangeDetails<T>];
  focusChange: [details: TreeViewFocusChangeDetails<T>];
  selectionChange: [details: TreeViewSelectionChangeDetails<T>];
  checkedChange: [details: TreeViewCheckedChangeDetails];
  loadChildrenComplete: [details: TreeViewLoadChildrenCompleteDetails<T>];
  loadChildrenError: [details: TreeViewLoadChildrenErrorDetails<T>];
  renameStart: [details: TreeViewRenameStartDetails<T>];
  beforeRename: [details: TreeViewRenameCompleteDetails];
  renameComplete: [details: TreeViewRenameCompleteDetails];
  'update:expandedValue': [value: string[]];
  'update:focusedValue': [value: string | null];
  'update:selectedValue': [value: string[]];
  'update:checkedValue': [value: string[]];
}
</script>

<script setup lang="ts" generic="T extends TreeNode">
import { TreeViewRoot as ArkTreeViewRoot } from '@ark-ui/vue/tree-view';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import styles from './TreeView.module.css';

defineOptions({ inheritAttrs: false });

const { class: className, collection } = defineProps<Props<T>>();
defineEmits</* @vue-ignore */ TreeViewRootEmits<T>>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :collection="collection"
    data-slot="tree-view-root"
  >
    <slot />
  </ArkTreeViewRoot>
</template>