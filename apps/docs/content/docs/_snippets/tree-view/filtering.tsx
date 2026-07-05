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
  imports: `import { useMemo, useState } from "react";
${treeViewCoreImportsCode}`,
  demo: `export function FilteringTreeDemo() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return collection;
    return collection.filter((node) => node.name.toLowerCase().includes(value));
  }, [query]);

  return (
    <>
      <input value={query} onChange={(event) => setQuery(event.currentTarget.value)} />
      <TreeView collection={filtered}>
        <TreeView.Label>Filtered files</TreeView.Label>
        <TreeView.Tree>
          ${createTreeNodesCode({
            source: 'filtered',
          })}
        </TreeView.Tree>
      </TreeView>
    </>
  );
}`,
});

//#endregion