/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const linksCollection = createTreeCollection({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      {
        id: 'docs',
        name: 'docs',
        children: [
          { id: 'docs/getting-started', name: 'getting-started.mdx', href: '/docs/quick-start' },
          { id: 'docs/components', name: 'components.mdx', href: '/docs/accordion' },
        ],
      },
      { id: 'README.md', name: 'README.md', href: '/docs' },
    ],
  },
});

createTreeViewCode({
  imports: treeViewCoreImportsCode,
  setup: treeViewLinksSetupCode,
  extraSetup: `const linksCollection = createTreeCollection<FileNode>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "docs",
        name: "docs",
        children: [
          { id: "docs/getting-started", name: "getting-started.mdx", href: "/docs/quick-start" },
          { id: "docs/components", name: "components.mdx", href: "/docs/accordion" },
        ],
      },
      { id: "README.md", name: "README.md", href: "/docs" },
    ],
  },
});`,
  demo: `export function LinksTreeDemo() {
  return (
    <TreeView collection={linksCollection} defaultExpandedValue={["docs"]}>
      <TreeView.Label>Documentation</TreeView.Label>
      <TreeView.Tree>
        ${createTreeNodesCode({
          source: 'linksCollection',
          component: 'LinkFileTreeNode',
        })}
      </TreeView.Tree>
    </TreeView>
  );
}`,
});

//#endregion