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
  demo: `export function ControlledSelectedDemo() {
  const [selectedValue, setSelectedValue] = useState(["package.json"] as string[]);

  return (
    <TreeView
      collection={collection}
      selectedValue={selectedValue}
      onSelectionChange={(details) => setSelectedValue(details.selectedValue)}
    >
      <TreeView.Label>Selected file</TreeView.Label>
      <TreeView.Tree>
        ${createTreeNodesCode()}
      </TreeView.Tree>
    </TreeView>
  );
}`,
});

//#endregion