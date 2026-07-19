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
  imports: `import { Button, TreeView, type TreeViewNodeProviderProps, createTreeCollection, useTreeView, useTreeViewNodeContext } from "@moduix/react";
import { File as FileIcon, Folder as FolderIcon, FolderOpen as FolderOpenIcon } from "lucide-react";`,
  extraSetup: `function ExpandCollapseControls({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <Button variant="outline" onClick={onToggle}>
      {expanded ? "Collapse all" : "Expand all"}
    </Button>
  );
}`,
  demo: `export function ExpandCollapseTreeDemo() {
  const treeView = useTreeView({ collection, defaultExpandedValue: ["src"] });
  const branchValues = treeView.collection.getBranchValues();
  const expanded = branchValues.every((value) => treeView.expandedValue.includes(value));

  return (
    <>
      <ExpandCollapseControls
        expanded={expanded}
        onToggle={() => (expanded ? treeView.collapse() : treeView.expand())}
      />
      <TreeView.RootProvider value={treeView}>
        <TreeView.Tree>
          ${createTreeNodesCode()}
        </TreeView.Tree>
      </TreeView.RootProvider>
    </>
  );
}`,
});

//#endregion