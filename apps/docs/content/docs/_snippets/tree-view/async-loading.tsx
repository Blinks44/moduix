/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const asyncResponse = {
  src: [
    { id: 'src/App.tsx', name: 'App.tsx' },
    { id: 'src/main.tsx', name: 'main.tsx' },
    { id: 'src/components', name: 'components', childrenCount: 2 },
  ],
  'src/components': [
    { id: 'src/components/Button.tsx', name: 'Button.tsx' },
    { id: 'src/components/Dialog.tsx', name: 'Dialog.tsx' },
  ],
};

createTreeViewCode({
  imports: `import { type TreeViewLoadChildrenDetails, useTreeViewNodeContext, type TreeViewNodeProviderProps } from "@ark-ui/react/tree-view";
import { useState } from "react";
import { FileIcon, FolderIcon, FolderOpenIcon, TreeView, createTreeCollection } from "@moduix/react";`,
  extraSetup: `const asyncCollection = createTreeCollection<FileNode>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      { id: "src", name: "src", childrenCount: 3 },
      { id: "package.json", name: "package.json" },
      { id: "README.md", name: "README.md" },
    ],
  },
});

const asyncResponse: Record<string, FileNode[]> = {
  src: [
    { id: "src/App.tsx", name: "App.tsx" },
    { id: "src/main.tsx", name: "main.tsx" },
    { id: "src/components", name: "components", childrenCount: 2 },
  ],
  "src/components": [
    { id: "src/components/Button.tsx", name: "Button.tsx" },
    { id: "src/components/Dialog.tsx", name: "Dialog.tsx" },
  ],
};

function loadChildren(details: TreeViewLoadChildrenDetails<FileNode>) {
  const value = details.valuePath.join("/");
  return new Promise<FileNode[]>((resolve) => {
    window.setTimeout(() => resolve(asyncResponse[value] ?? []), 450);
  });
}`,
  demo: `export function AsyncTreeDemo() {
  const [source, setSource] = useState(asyncCollection);

  return (
    <TreeView
      collection={source}
      loadChildren={loadChildren}
      onLoadChildrenComplete={(details) => setSource(details.collection)}
    >
      <TreeView.Label>Lazy folders</TreeView.Label>
      <TreeView.Tree>
        ${createTreeNodesCode({
          source: 'source',
        })}
      </TreeView.Tree>
    </TreeView>
  );
}`,
});

//#endregion