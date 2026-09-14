import {
  TreeView,
  createTreeCollection,
  type TreeViewNodeProviderProps,
} from '@moduix/solid/tree-view';
import { For, Show } from 'solid-js';

type LinkNode = { children?: LinkNode[]; href?: string; id: string; name: string };

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

function LinkTreeNode(props: TreeViewNodeProviderProps<LinkNode>) {
  return (
    <TreeView.Node node={props.node} indexPath={props.indexPath}>
      {({ node: currentNode, indexPath: currentIndexPath, state }) => (
        <Show
          when={state().isBranch}
          fallback={
            <TreeView.Item
              asChild={(itemProps) => (
                <a {...itemProps()} href={currentNode.href}>
                  {currentNode.name}
                </a>
              )}
            />
          }
        >
          <TreeView.Branch>
            <TreeView.BranchControl>
              <TreeView.BranchIndicator />
              <TreeView.BranchText>{currentNode.name}</TreeView.BranchText>
            </TreeView.BranchControl>
            <TreeView.BranchContent>
              <TreeView.BranchIndentGuide />
              <For each={currentNode.children ?? []}>
                {(child, index) => (
                  <LinkTreeNode node={child} indexPath={[...currentIndexPath, index()]} />
                )}
              </For>
            </TreeView.BranchContent>
          </TreeView.Branch>
        </Show>
      )}
    </TreeView.Node>
  );
}

export default function LinkedTreeViewDemo() {
  return (
    <TreeView collection={collection} defaultExpandedValue={['docs', 'docs/guides']}>
      <TreeView.Label>Documentation</TreeView.Label>
      <TreeView.Tree>
        <For each={collection.rootNode.children ?? []}>
          {(node, index) => <LinkTreeNode node={node} indexPath={[index()]} />}
        </For>
      </TreeView.Tree>
    </TreeView>
  );
}