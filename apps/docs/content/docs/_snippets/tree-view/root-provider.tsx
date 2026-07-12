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
  imports: `import { FileIcon, FolderIcon, FolderOpenIcon, TreeView, type TreeViewNodeProviderProps, createTreeCollection, useTreeView, useTreeViewNodeContext } from "@moduix/react";`,
  demo: `export function RootProviderTreeDemo() {
  const treeView = useTreeView({ collection, defaultSelectedValue: ["README.md"] });

  return (
    <TreeView.RootProvider value={treeView}>
      <TreeView.Label>Root provider</TreeView.Label>
      <TreeView.Tree>
        ${createTreeNodesCode()}
      </TreeView.Tree>
    </TreeView.RootProvider>
  );
}`,
});

//#endregion