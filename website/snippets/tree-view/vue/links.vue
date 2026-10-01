<script setup lang="ts">
import {
  TreeView,
  TreeViewBranch,
  TreeViewBranchContent,
  TreeViewBranchControl,
  TreeViewBranchIndicator,
  TreeViewBranchIndentGuide,
  TreeViewBranchText,
  TreeViewItem,
  TreeViewItemText,
  TreeViewLabel,
  TreeViewNode,
  TreeViewTree,
  createTreeCollection,
} from '@moduix/vue/tree-view';
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

type LinkNode = {
  children?: LinkNode[];
  href?: string;
  id: string;
  name: string;
};

const collection = createTreeCollection<LinkNode>({
  nodeToString: (node) => node.name,
  nodeToValue: (node) => node.id,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      {
        id: 'docs',
        name: 'docs',
        children: [
          { id: 'docs/getting-started', name: 'getting-started.mdx', href: '/docs' },
          { id: 'docs/tree-view', name: 'tree-view.mdx', href: '/docs/tree-view' },
          {
            id: 'docs/guides',
            name: 'guides',
            children: [
              { id: 'docs/guides/styling', name: 'styling.mdx', href: '/docs' },
              { id: 'docs/guides/testing', name: 'testing.mdx', href: '/docs' },
            ],
          },
        ],
      },
      { id: 'CHANGELOG.md', name: 'CHANGELOG.md', href: '/docs' },
    ],
  },
});

const treeComponents = {
  TreeView,
  TreeViewBranch,
  TreeViewBranchContent,
  TreeViewBranchControl,
  TreeViewBranchIndicator,
  TreeViewBranchIndentGuide,
  TreeViewBranchText,
  TreeViewItem,
  TreeViewItemText,
  TreeViewLabel,
  TreeViewNode,
  TreeViewTree,
};

const LinkTreeNode = defineComponent({
  name: 'LinkTreeNode',
  components: treeComponents,
  props: {
    node: { type: Object as PropType<LinkNode>, required: true },
    indexPath: { type: Array as PropType<number[]>, required: true },
  },
  template: `
    <TreeViewNode :node="node" :index-path="indexPath" v-slot="{ node: currentNode, indexPath: currentIndexPath, state }">
      <TreeViewBranch v-if="state.isBranch">
        <TreeViewBranchControl>
          <TreeViewBranchIndicator />
          <TreeViewBranchText>{{ currentNode.name }}</TreeViewBranchText>
        </TreeViewBranchControl>
        <TreeViewBranchContent>
          <TreeViewBranchIndentGuide />
          <LinkTreeNode
            v-for="(child, index) in currentNode.children"
            :key="child.id"
            :node="child"
            :index-path="[...currentIndexPath, index]"
          />
        </TreeViewBranchContent>
      </TreeViewBranch>
      <TreeViewItem v-else as-child>
        <a :href="currentNode.href">{{ currentNode.name }}</a>
      </TreeViewItem>
    </TreeViewNode>
  `,
});
</script>

<template>
  <TreeView :collection="collection" :default-expanded-value="['docs', 'docs/guides']">
    <TreeViewLabel>Documentation</TreeViewLabel>
    <TreeViewTree>
      <LinkTreeNode
        v-for="(node, index) in collection.rootNode.children"
        :key="node.id"
        :node="node"
        :index-path="[index]"
      />
    </TreeViewTree>
  </TreeView>
</template>