/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const disabledCollection = createTreeCollection({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      {
        id: 'src',
        name: 'src',
        children: [{ id: 'src/main.tsx', name: 'main.tsx', disabled: true }],
      },
      { id: 'README.md', name: 'README.md', disabled: true },
    ],
  },
});

createTreeViewCode({
  extraSetup: `const disabledCollection = createTreeCollection<FileNode>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/App.tsx", name: "App.tsx" },
          { id: "src/main.tsx", name: "main.tsx", disabled: true },
        ],
      },
      { id: "package.json", name: "package.json" },
      { id: "README.md", name: "README.md", disabled: true },
    ],
  },
});`,
  demo: `export function DisabledNodeTreeDemo() {
  return (
    <TreeView collection={disabledCollection} defaultExpandedValue={["src"]}>
      <TreeView.Label>Disabled files</TreeView.Label>
      <TreeView.Tree>
        ${createTreeNodesCode({
          source: 'disabledCollection',
        })}
      </TreeView.Tree>
    </TreeView>
  );
}`,
});

//#endregion