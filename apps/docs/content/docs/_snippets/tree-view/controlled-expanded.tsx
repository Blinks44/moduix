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
  demo: `export function ControlledExpandedDemo() {
  const [expandedValue, setExpandedValue] = useState(["src"] as string[]);

  return (
    <TreeView
      collection={collection}
      expandedValue={expandedValue}
      onExpandedChange={(details) => setExpandedValue(details.expandedValue)}
    >
      <TreeView.Label>Expanded folders</TreeView.Label>
      <TreeView.Tree>
        ${createTreeNodesCode()}
      </TreeView.Tree>
    </TreeView>
  );
}`,
});

//#endregion