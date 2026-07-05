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
  imports: treeViewCheckboxImportsCode,
  setup: treeViewCheckboxSetupCode,
  demo: `export function CheckboxTreeDemo() {
  return (
    <TreeView
      collection={collection}
      defaultExpandedValue={["src"]}
      defaultCheckedValue={["src/App.tsx"]}
    >
      <TreeView.Label>Checked files</TreeView.Label>
      <TreeView.Tree>
        ${createTreeNodesCode({
          component: 'CheckboxFileTreeNode',
        })}
      </TreeView.Tree>
    </TreeView>
  );
}`,
});

//#endregion