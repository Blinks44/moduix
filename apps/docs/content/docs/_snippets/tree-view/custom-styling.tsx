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
  imports: `${treeViewCoreImportsCode}
import styles from "./tree-view-demo.module.css";`,
  demo: `export function CustomStyledTreeDemo() {
  return (
    <TreeView
      collection={collection}
      defaultExpandedValue={["src", "src/components"]}
      className={styles.root}
    >
      <TreeView.Label>Custom styled files</TreeView.Label>
      <TreeView.Tree>
        ${createTreeNodesCode()}
      </TreeView.Tree>
    </TreeView>
  );
}`,
});

//#endregion