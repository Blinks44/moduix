<script lang="ts">
import type { TreeNode, TreeViewNodeProviderProps, TreeViewNodeState } from '@ark-ui/vue/tree-view';

export interface TreeViewNodeProps<T extends TreeNode>
  extends /* @vue-ignore */ TreeViewNodeProviderProps<T> {
  indexPath: TreeViewNodeProviderProps<T>['indexPath'];
  node: TreeViewNodeProviderProps<T>['node'];
}

export interface TreeViewNodeRenderProps<T extends TreeNode> {
  indexPath: number[];
  node: T;
  state: TreeViewNodeState;
}
</script>

<script setup lang="ts" generic="T extends TreeNode">
import {
  TreeViewNodeContext as ArkTreeViewNodeContext,
  TreeViewNodeProvider as ArkTreeViewNodeProvider,
} from '@ark-ui/vue/tree-view';

defineOptions({ inheritAttrs: false });

const { indexPath, node } = defineProps<TreeViewNodeProps<T>>();
defineSlots<{ default?: (props: TreeViewNodeRenderProps<T>) => unknown }>();
</script>

<template>
  <ArkTreeViewNodeProvider :index-path="indexPath" :node="node">
    <ArkTreeViewNodeContext v-slot="state">
      <slot :index-path="indexPath" :node="node" :state="state" />
    </ArkTreeViewNodeContext>
  </ArkTreeViewNodeProvider>
</template>