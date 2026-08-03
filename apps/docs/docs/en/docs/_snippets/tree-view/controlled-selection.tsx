import { TreeView, createTreeCollection } from '@moduix/react/tree-view';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

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
  const [selectedValue, setSelectedValue] = useState<string[]>(['package.json']);

  return (
    <div style={{ display: 'grid', gap: '0.75rem', justifyItems: 'center' }}>
      <TreeView
        collection={collection}
        selectedValue={selectedValue}
        selectionMode="multiple"
        onSelectionChange={(details) => setSelectedValue(details.selectedValue)}
      >
        <TreeView.Label>Selected files</TreeView.Label>
        <TreeView.Tree>
          {collection.rootNode.children?.map((node, index) => (
            <TreeView.Node key={node.id} node={node} indexPath={[index]}>
              {({ node: currentNode }) => (
                <TreeView.Item>
                  <TreeView.ItemText>{currentNode.name}</TreeView.ItemText>
                </TreeView.Item>
              )}
            </TreeView.Node>
          ))}
        </TreeView.Tree>
      </TreeView>
      <PreviewMeta style={{ justifySelf: 'center' }}>
        <output aria-live="polite">Selected: {selectedValue.join(', ') || 'none'}</output>
      </PreviewMeta>
    </div>
  );
}