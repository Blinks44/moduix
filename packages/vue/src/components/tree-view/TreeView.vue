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
const emit = defineEmits<TreeViewRootEmits<T>>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :collection="collection"
    data-slot="tree-view-root"
    @expanded-change="emit('expandedChange', $event)"
    @focus-change="emit('focusChange', $event)"
    @selection-change="emit('selectionChange', $event)"
    @checked-change="emit('checkedChange', $event)"
    @load-children-complete="emit('loadChildrenComplete', $event)"
    @load-children-error="emit('loadChildrenError', $event)"
    @rename-start="emit('renameStart', $event)"
    @before-rename="emit('beforeRename', $event)"
    @rename-complete="emit('renameComplete', $event)"
    @update:expanded-value="emit('update:expandedValue', $event)"
    @update:focused-value="emit('update:focusedValue', $event)"
    @update:selected-value="emit('update:selectedValue', $event)"
    @update:checked-value="emit('update:checkedValue', $event)"
  >
    <slot />
  </ArkTreeViewRoot>
</template>