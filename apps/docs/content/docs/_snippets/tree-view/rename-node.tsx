/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const collection = createTreeCollection({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      { id: 'src', name: 'src', children: [{ id: 'src/App.tsx', name: 'App.tsx' }] },
      { id: 'package.json', name: 'package.json' },
    ],
  },
});

createTreeViewCode({
  imports: `import { useState } from "react";
${treeViewCoreImportsCode}`,
  setup: treeViewRenameSetupCode,
  demo: `export function RenameTreeDemo() {
  const [source, setSource] = useState(collection);

  return (
    <TreeView
      collection={source}
      canRename={() => true}
      onRenameComplete={(details) => {
        setSource((current) => {
          const node = current.at(details.indexPath);
          if (!node) return current;
          return current.replace(details.indexPath, { ...node, name: details.label });
        });
      }}
    >
      <TreeView.Label>Rename with F2</TreeView.Label>
      <TreeView.Tree>
        ${createTreeNodesCode({
          source: 'source',
          component: 'RenamableFileTreeNode',
        })}
      </TreeView.Tree>
    </TreeView>
  );
}`,
});

//#endregion