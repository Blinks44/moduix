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
  demo: `export function TreeViewDemo() {
  return (
    <TreeView collection={collection} defaultExpandedValue={["src"]}>
      <TreeView.Label>Project files</TreeView.Label>
      <TreeView.Tree>
        ${createTreeNodesCode()}
      </TreeView.Tree>
    </TreeView>
  );
}`,
});

//#endregion