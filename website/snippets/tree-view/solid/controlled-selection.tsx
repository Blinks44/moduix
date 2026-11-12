import { Stack } from '@moduix/solid/stack';
import {
  TreeViewItemText,
  TreeViewItem,
  TreeViewNode,
  TreeViewTree,
  TreeViewLabel,
  TreeView,
  createTreeCollection,
} from '@moduix/solid/tree-view';
import { createSignal, For } from 'solid-js';

type FileNode = { children?: FileNode[]; id: string; name: string };

const collection = createTreeCollection<FileNode>({
  nodeToString: (node) => node.name,
  nodeToValue: (node) => node.id,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      { id: 'eslint.config.js', name: 'eslint.config.js' },
      { id: 'package.json', name: 'package.json' },
      { id: 'README.md', name: 'README.md' },
      { id: 'src/App.tsx', name: 'App.tsx' },
      { id: 'src/main.tsx', name: 'main.tsx' },
      { id: 'tsconfig.json', name: 'tsconfig.json' },
    ],
  },
});

export default function ControlledSelectionTreeViewDemo() {
  const [selectedValue, setSelectedValue] = createSignal<string[]>(['package.json']);

  return (
    <Stack align="center" gap="3">
      <TreeView
        collection={collection}
        selectedValue={selectedValue()}
        selectionMode="multiple"
        onSelectionChange={(details) => setSelectedValue(details.selectedValue)}
      >
        <TreeViewLabel>Selected files</TreeViewLabel>
        <TreeViewTree>
          <For each={collection.rootNode.children ?? []}>
            {(node, index) => (
              <TreeViewNode node={node} indexPath={[index()]}>
                {({ node: currentNode }) => (
                  <TreeViewItem>
                    <TreeViewItemText>{currentNode.name}</TreeViewItemText>
                  </TreeViewItem>
                )}
              </TreeViewNode>
            )}
          </For>
        </TreeViewTree>
      </TreeView>
      <div data-preview-meta>
        <output aria-live="polite">Selected: {selectedValue().join(', ') || 'none'}</output>
      </div>
    </Stack>
  );
}