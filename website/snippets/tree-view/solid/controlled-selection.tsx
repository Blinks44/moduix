import { TreeView, createTreeCollection } from '@moduix/solid/tree-view';
import { createSignal, For } from 'solid-js';
import styles from '@/components/examples/tree-view/tree-view-controlled-selection.module.css';

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
    <div class={styles.root}>
      <TreeView
        collection={collection}
        selectedValue={selectedValue()}
        selectionMode="multiple"
        onSelectionChange={(details) => setSelectedValue(details.selectedValue)}
      >
        <TreeView.Label>Selected files</TreeView.Label>
        <TreeView.Tree>
          <For each={collection.rootNode.children ?? []}>
            {(node, index) => (
              <TreeView.Node node={node} indexPath={[index()]}>
                {({ node: currentNode }) => (
                  <TreeView.Item>
                    <TreeView.ItemText>{currentNode.name}</TreeView.ItemText>
                  </TreeView.Item>
                )}
              </TreeView.Node>
            )}
          </For>
        </TreeView.Tree>
      </TreeView>
      <output aria-live="polite">Selected: {selectedValue().join(', ') || 'none'}</output>
    </div>
  );
}