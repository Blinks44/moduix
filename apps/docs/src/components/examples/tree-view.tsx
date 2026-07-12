import type { ReactNode } from 'react';
import {
  Button,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  RestartIcon,
  TreeView,
  type TreeViewLoadChildrenDetails,
  type TreeViewNodeProviderProps,
  createTreeCollection,
  useTreeView,
  useTreeViewNodeContext,
} from '@moduix/react';
import { useMemo, useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './tree-view.module.css';

interface FileNode {
  id: string;
  name: string;
  disabled?: boolean;
  children?: FileNode[];
  childrenCount?: number;
  href?: string;
}

const treeData: FileNode = {
  id: 'ROOT',
  name: '',
  children: [
    {
      id: 'src',
      name: 'src',
      children: [
        { id: 'src/App.tsx', name: 'App.tsx' },
        { id: 'src/main.tsx', name: 'main.tsx' },
        {
          id: 'src/components',
          name: 'components',
          children: [
            { id: 'src/components/Button.tsx', name: 'Button.tsx' },
            { id: 'src/components/Dialog.tsx', name: 'Dialog.tsx' },
          ],
        },
      ],
    },
    {
      id: 'public',
      name: 'public',
      children: [{ id: 'public/favicon.svg', name: 'favicon.svg' }],
    },
    { id: 'package.json', name: 'package.json' },
    { id: 'README.md', name: 'README.md' },
  ],
};

const linkData: FileNode = {
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
};

const asyncResponse: Record<string, FileNode[]> = {
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

function createFilesCollection(rootNode: FileNode = treeData) {
  return createTreeCollection<FileNode>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode,
  });
}

const collection = createFilesCollection();
const linksCollection = createFilesCollection(linkData);
const asyncCollection = createFilesCollection({
  id: 'ROOT',
  name: '',
  children: [
    { id: 'src', name: 'src', childrenCount: 3 },
    { id: 'package.json', name: 'package.json' },
    { id: 'README.md', name: 'README.md' },
  ],
});
const disabledCollection = createFilesCollection({
  id: 'ROOT',
  name: '',
  children: [
    {
      id: 'src',
      name: 'src',
      children: [
        { id: 'src/App.tsx', name: 'App.tsx' },
        { id: 'src/main.tsx', name: 'main.tsx', disabled: true },
      ],
    },
    { id: 'package.json', name: 'package.json' },
    { id: 'README.md', name: 'README.md', disabled: true },
  ],
});

function Checkbox() {
  return (
    <TreeView.NodeCheckbox>
      <TreeView.NodeCheckboxIndicator />
    </TreeView.NodeCheckbox>
  );
}

function FileTreeNode({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      <FileTreeNodeContent node={node} indexPath={indexPath} />
    </TreeView.NodeProvider>
  );
}

function FileTreeNodeContent({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  const state = useTreeViewNodeContext();

  if (node.children || node.childrenCount) {
    return (
      <TreeView.Branch>
        <TreeView.BranchControl>
          <TreeView.BranchIndicator />
          <TreeView.BranchText>
            {state.loading ? (
              <RestartIcon className={styles.loadingIcon} />
            ) : state.expanded ? (
              <FolderOpenIcon />
            ) : (
              <FolderIcon />
            )}
            {node.name}
          </TreeView.BranchText>
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.BranchIndentGuide />
          {node.children?.map((child, index) => (
            <FileTreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
          ))}
        </TreeView.BranchContent>
      </TreeView.Branch>
    );
  }

  return (
    <TreeView.Item>
      <TreeView.ItemText>
        <FileIcon />
        {node.name}
      </TreeView.ItemText>
    </TreeView.Item>
  );
}

function CheckboxFileTreeNode({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      <CheckboxFileTreeNodeContent node={node} indexPath={indexPath} />
    </TreeView.NodeProvider>
  );
}

function CheckboxFileTreeNodeContent({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  const state = useTreeViewNodeContext();

  if (node.children) {
    return (
      <TreeView.Branch>
        <TreeView.BranchControl>
          <TreeView.BranchIndicator />
          <Checkbox />
          <TreeView.BranchText>
            {state.expanded ? <FolderOpenIcon /> : <FolderIcon />}
            {node.name}
          </TreeView.BranchText>
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.BranchIndentGuide />
          {node.children.map((child, index) => (
            <CheckboxFileTreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
          ))}
        </TreeView.BranchContent>
      </TreeView.Branch>
    );
  }

  return (
    <TreeView.Item>
      <Checkbox />
      <TreeView.ItemText>
        <FileIcon />
        {node.name}
      </TreeView.ItemText>
    </TreeView.Item>
  );
}

function RenamableFileTreeNode({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      <RenamableFileTreeNodeContent node={node} indexPath={indexPath} />
    </TreeView.NodeProvider>
  );
}

function RenamableFileTreeNodeContent({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  const state = useTreeViewNodeContext();

  if (node.children) {
    return (
      <TreeView.Branch>
        <TreeView.BranchControl>
          <TreeView.BranchIndicator />
          {state.renaming ? (
            <TreeView.NodeRenameInput />
          ) : (
            <TreeView.BranchText>
              {state.expanded ? <FolderOpenIcon /> : <FolderIcon />}
              {node.name}
            </TreeView.BranchText>
          )}
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.BranchIndentGuide />
          {node.children.map((child, index) => (
            <RenamableFileTreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
          ))}
        </TreeView.BranchContent>
      </TreeView.Branch>
    );
  }

  return (
    <TreeView.Item>
      <TreeView.ItemText>
        <FileIcon />
        {state.renaming ? <TreeView.NodeRenameInput /> : node.name}
      </TreeView.ItemText>
    </TreeView.Item>
  );
}

function LinkFileTreeNode({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      <LinkFileTreeNodeContent node={node} indexPath={indexPath} />
    </TreeView.NodeProvider>
  );
}

function LinkFileTreeNodeContent({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  const state = useTreeViewNodeContext();

  if (node.children) {
    return (
      <TreeView.Branch>
        <TreeView.BranchControl>
          <TreeView.BranchIndicator />
          <TreeView.BranchText>
            {state.expanded ? <FolderOpenIcon /> : <FolderIcon />}
            {node.name}
          </TreeView.BranchText>
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.BranchIndentGuide />
          {node.children.map((child, index) => (
            <LinkFileTreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
          ))}
        </TreeView.BranchContent>
      </TreeView.Branch>
    );
  }

  if (node.href) {
    return (
      <TreeView.Item asChild>
        <a href={node.href}>
          <TreeView.ItemText>
            <FileIcon />
            {node.name}
          </TreeView.ItemText>
        </a>
      </TreeView.Item>
    );
  }

  return (
    <TreeView.Item>
      <TreeView.ItemText>
        <FileIcon />
        {node.name}
      </TreeView.ItemText>
    </TreeView.Item>
  );
}

function Stack({ children }: { children: ReactNode }) {
  return <div className={styles.stack}>{children}</div>;
}

function ExpandCollapseControls({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <Button variant="outline" onClick={onToggle}>
        {expanded ? 'Collapse all' : 'Expand all'}
      </Button>
    </div>
  );
}

function loadChildren(details: TreeViewLoadChildrenDetails<FileNode>) {
  const value = details.valuePath.join('/');
  return new Promise<FileNode[]>((resolve) => {
    window.setTimeout(() => resolve(asyncResponse[value] ?? []), 450);
  });
}

export const treeViewExampleCss = `
  .tree-view-demo {
    --tree-view-width: 22rem;
  }
`;

const treeViewCoreImportsCode = `import { FileIcon, FolderIcon, FolderOpenIcon, TreeView, type TreeViewNodeProviderProps, createTreeCollection, useTreeViewNodeContext } from "@moduix/react";`;

const treeViewDataSetupCode = `interface FileNode {
  id: string;
  name: string;
  disabled?: boolean;
  children?: FileNode[];
  childrenCount?: number;
  href?: string;
}

const collection = createTreeCollection<FileNode>({
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
          { id: "src/main.tsx", name: "main.tsx" },
          {
            id: "src/components",
            name: "components",
            children: [
              { id: "src/components/Button.tsx", name: "Button.tsx" },
              { id: "src/components/Dialog.tsx", name: "Dialog.tsx" },
            ],
          },
        ],
      },
      { id: "public", name: "public", children: [{ id: "public/favicon.svg", name: "favicon.svg" }] },
      { id: "package.json", name: "package.json" },
      { id: "README.md", name: "README.md" },
    ],
  },
});`;

const treeViewBaseNodeSetupCode = `function FileTreeNode({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      <FileTreeNodeContent node={node} indexPath={indexPath} />
    </TreeView.NodeProvider>
  );
}

function FileTreeNodeContent({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  const state = useTreeViewNodeContext();

  if (node.children || node.childrenCount) {
    return (
      <TreeView.Branch>
        <TreeView.BranchControl>
          <TreeView.BranchIndicator />
          <TreeView.BranchText>
            {state.expanded ? <FolderOpenIcon /> : <FolderIcon />}
            {node.name}
          </TreeView.BranchText>
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.BranchIndentGuide />
          {node.children?.map((child, index) => (
            <FileTreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
          ))}
        </TreeView.BranchContent>
      </TreeView.Branch>
    );
  }

  return (
    <TreeView.Item>
      <TreeView.ItemText>
        <FileIcon />
        {node.name}
      </TreeView.ItemText>
    </TreeView.Item>
  );
}

`;

const treeViewCoreSetupCode = `${treeViewDataSetupCode}

${treeViewBaseNodeSetupCode}`;

const treeViewCheckboxImportsCode = `import { FileIcon, FolderIcon, FolderOpenIcon, TreeView, type TreeViewNodeProviderProps, createTreeCollection, useTreeViewNodeContext } from "@moduix/react";`;

const treeViewCheckboxSetupCode = `${treeViewDataSetupCode}

function NodeCheckbox() {
  return (
    <TreeView.NodeCheckbox>
      <TreeView.NodeCheckboxIndicator />
    </TreeView.NodeCheckbox>
  );
}

function CheckboxFileTreeNode({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      <CheckboxFileTreeNodeContent node={node} indexPath={indexPath} />
    </TreeView.NodeProvider>
  );
}

function CheckboxFileTreeNodeContent({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  const state = useTreeViewNodeContext();

  if (node.children) {
    return (
      <TreeView.Branch>
        <TreeView.BranchControl>
          <TreeView.BranchIndicator />
          <NodeCheckbox />
          <TreeView.BranchText>
            {state.expanded ? <FolderOpenIcon /> : <FolderIcon />}
            {node.name}
          </TreeView.BranchText>
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.BranchIndentGuide />
          {node.children.map((child, index) => (
            <CheckboxFileTreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
          ))}
        </TreeView.BranchContent>
      </TreeView.Branch>
    );
  }

  return (
    <TreeView.Item>
      <NodeCheckbox />
      <TreeView.ItemText>
        <FileIcon />
        {node.name}
      </TreeView.ItemText>
    </TreeView.Item>
  );
}

`;

const treeViewRenameSetupCode = `${treeViewDataSetupCode}

function RenamableFileTreeNode({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      <RenamableFileTreeNodeContent node={node} indexPath={indexPath} />
    </TreeView.NodeProvider>
  );
}

function RenamableFileTreeNodeContent({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  const state = useTreeViewNodeContext();

  if (node.children) {
    return (
      <TreeView.Branch>
        <TreeView.BranchControl>
          <TreeView.BranchIndicator />
          {state.renaming ? (
            <TreeView.NodeRenameInput />
          ) : (
            <TreeView.BranchText>
              {state.expanded ? <FolderOpenIcon /> : <FolderIcon />}
              {node.name}
            </TreeView.BranchText>
          )}
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.BranchIndentGuide />
          {node.children.map((child, index) => (
            <RenamableFileTreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
          ))}
        </TreeView.BranchContent>
      </TreeView.Branch>
    );
  }

  return (
    <TreeView.Item>
      <TreeView.ItemText>
        <FileIcon />
        {state.renaming ? <TreeView.NodeRenameInput /> : node.name}
      </TreeView.ItemText>
    </TreeView.Item>
  );
}

`;

const treeViewLinksSetupCode = `${treeViewDataSetupCode}

function LinkFileTreeNode({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      <LinkFileTreeNodeContent node={node} indexPath={indexPath} />
    </TreeView.NodeProvider>
  );
}

function LinkFileTreeNodeContent({ node, indexPath }: TreeViewNodeProviderProps<FileNode>) {
  const state = useTreeViewNodeContext();

  if (node.children) {
    return (
      <TreeView.Branch>
        <TreeView.BranchControl>
          <TreeView.BranchIndicator />
          <TreeView.BranchText>
            {state.expanded ? <FolderOpenIcon /> : <FolderIcon />}
            {node.name}
          </TreeView.BranchText>
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.BranchIndentGuide />
          {node.children.map((child, index) => (
            <LinkFileTreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
          ))}
        </TreeView.BranchContent>
      </TreeView.Branch>
    );
  }

  if (node.href) {
    return (
      <TreeView.Item asChild>
        <a href={node.href}>
          <TreeView.ItemText>
            <FileIcon />
            {node.name}
          </TreeView.ItemText>
        </a>
      </TreeView.Item>
    );
  }

  return (
    <TreeView.Item>
      <TreeView.ItemText>
        <FileIcon />
        {node.name}
      </TreeView.ItemText>
    </TreeView.Item>
  );
}

`;

function createTreeNodesCode({
  source = 'collection',
  component = 'FileTreeNode',
  props = '',
}: {
  source?: string;
  component?: string;
  props?: string;
} = {}) {
  return `{${source}.rootNode.children?.map((node, index) => (
        <${component} key={node.id} node={node} indexPath={[index]}${props} />
      ))}`;
}

function createTreeViewCode({
  imports = treeViewCoreImportsCode,
  setup = treeViewCoreSetupCode,
  extraSetup = '',
  demo,
}: {
  imports?: string;
  setup?: string;
  extraSetup?: string;
  demo: string;
}) {
  return [imports, setup, extraSetup, demo].filter(Boolean).join('\n\n');
}

export const treeViewBasicCode = createTreeViewCode({
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

export const treeViewControlledExpandedCode = createTreeViewCode({
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

export const treeViewControlledSelectedCode = createTreeViewCode({
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

export const treeViewCheckboxCode = createTreeViewCode({
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
        ${createTreeNodesCode({ component: 'CheckboxFileTreeNode' })}
      </TreeView.Tree>
    </TreeView>
  );
}`,
});

export const treeViewDisabledCode = createTreeViewCode({
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
        ${createTreeNodesCode({ source: 'disabledCollection' })}
      </TreeView.Tree>
    </TreeView>
  );
}`,
});

export const treeViewExpandCollapseCode = createTreeViewCode({
  imports: `import { Button, FileIcon, FolderIcon, FolderOpenIcon, TreeView, type TreeViewNodeProviderProps, createTreeCollection, useTreeView, useTreeViewNodeContext } from "@moduix/react";`,
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

export const treeViewFilteringCode = createTreeViewCode({
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
          ${createTreeNodesCode({ source: 'filtered' })}
        </TreeView.Tree>
      </TreeView>
    </>
  );
}`,
});

export const treeViewAsyncCode = createTreeViewCode({
  imports: `import { useState } from "react";
import { FileIcon, FolderIcon, FolderOpenIcon, TreeView, type TreeViewLoadChildrenDetails, type TreeViewNodeProviderProps, createTreeCollection, useTreeViewNodeContext } from "@moduix/react";`,
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
        ${createTreeNodesCode({ source: 'source' })}
      </TreeView.Tree>
    </TreeView>
  );
}`,
});

export const treeViewLazyMountCode = createTreeViewCode({
  demo: `export function LazyMountTreeDemo() {
  return (
    <TreeView collection={collection} defaultExpandedValue={["src"]} lazyMount unmountOnExit>
      <TreeView.Label>Lazy mounted folders</TreeView.Label>
      <TreeView.Tree>
        ${createTreeNodesCode()}
      </TreeView.Tree>
    </TreeView>
  );
}`,
});

export const treeViewRenameCode = createTreeViewCode({
  imports: `import { useState } from "react";
${treeViewCoreImportsCode}`,
  setup: treeViewRenameSetupCode,
  demo: `export function RenameTreeDemo() {
  const [source, setSource] = useState(collection);

  return (
    <TreeView
      collection={source}
      canRename={() => true}
      onRenameComplete={(details) => {
        setSource((current) => {
          const node = current.at(details.indexPath);
          if (!node) return current;
          return current.replace(details.indexPath, { ...node, name: details.label });
        });
      }}
    >
      <TreeView.Label>Rename with F2</TreeView.Label>
      <TreeView.Tree>
        ${createTreeNodesCode({ source: 'source', component: 'RenamableFileTreeNode' })}
      </TreeView.Tree>
    </TreeView>
  );
}`,
});

export const treeViewRootProviderCode = createTreeViewCode({
  imports: `import { FileIcon, FolderIcon, FolderOpenIcon, TreeView, type TreeViewNodeProviderProps, createTreeCollection, useTreeView, useTreeViewNodeContext } from "@moduix/react";`,
  demo: `export function RootProviderTreeDemo() {
  const treeView = useTreeView({ collection, defaultSelectedValue: ["README.md"] });

  return (
    <TreeView.RootProvider value={treeView}>
      <TreeView.Label>Root provider</TreeView.Label>
      <TreeView.Tree>
        ${createTreeNodesCode()}
      </TreeView.Tree>
    </TreeView.RootProvider>
  );
}`,
});

export const treeViewAdvancedCustomizationCode = createTreeViewCode({
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
  demo: `export function AdvancedCustomizationTreeDemo() {
  return (
    <TreeView collection={linksCollection} defaultExpandedValue={["docs"]}>
      <TreeView.Label>Documentation</TreeView.Label>
      <TreeView.Tree>
        ${createTreeNodesCode({ source: 'linksCollection', component: 'LinkFileTreeNode' })}
      </TreeView.Tree>
    </TreeView>
  );
}`,
});
export const treeViewData = `const collection = createTreeCollection({
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
});`;

export const treeViewDisabledData = `const disabledCollection = createTreeCollection({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      { id: 'src', name: 'src', children: [{ id: 'src/main.tsx', name: 'main.tsx', disabled: true }] },
      { id: 'README.md', name: 'README.md', disabled: true },
    ],
  },
});`;

export const treeViewAsyncData = `const asyncResponse = {
  src: [
    { id: 'src/App.tsx', name: 'App.tsx' },
    { id: 'src/main.tsx', name: 'main.tsx' },
    { id: 'src/components', name: 'components', childrenCount: 2 },
  ],
  'src/components': [
    { id: 'src/components/Button.tsx', name: 'Button.tsx' },
    { id: 'src/components/Dialog.tsx', name: 'Dialog.tsx' },
  ],
};`;

export const treeViewAdvancedCustomizationData = `const linksCollection = createTreeCollection({
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
});`;

const treeViewOverrideCssProperties: CssPropertyInput[] = [
  ['--tree-view-checkbox-bg', 'var(--color-background)', 'Customizes tree view checkbox bg.'],
  [
    '--tree-view-checkbox-border-color',
    'var(--color-border)',
    'Customizes tree view checkbox border color.',
  ],
  [
    '--tree-view-checkbox-border-width',
    'var(--border-width-sm)',
    'Customizes tree view checkbox border width.',
  ],
  [
    '--tree-view-checkbox-checked-bg',
    'var(--color-primary)',
    'Customizes tree view checkbox checked bg.',
  ],
  [
    '--tree-view-checkbox-color',
    'var(--color-primary-foreground)',
    'Customizes tree view checkbox color.',
  ],
  [
    '--tree-view-checkbox-focus-ring-offset',
    'var(--border-width-sm)',
    'Customizes tree view checkbox focus ring offset.',
  ],
  ['--tree-view-checkbox-icon-size', '0.75rem', 'Customizes tree view checkbox icon size.'],
  ['--tree-view-checkbox-radius', 'var(--radius-xs)', 'Customizes tree view checkbox radius.'],
  ['--tree-view-checkbox-size', '1rem', 'Controls node checkbox size.'],
  ['--tree-view-color', 'var(--color-foreground)', 'Controls text and icon color.'],
  [
    '--tree-view-content-transition-duration',
    '150ms',
    'Customizes tree view content transition duration.',
  ],
  [
    '--tree-view-disabled-opacity',
    'var(--opacity-disabled)',
    'Customizes tree view disabled opacity.',
  ],
  ['--tree-view-focus-ring-color', 'var(--color-ring)', 'Controls row and checkbox focus rings.'],
  [
    '--tree-view-focus-ring-width',
    'var(--border-width-sm)',
    'Customizes tree view focus ring width.',
  ],
  ['--tree-view-indent', '1rem', 'Controls nested row indentation.'],
  ['--tree-view-indent-guide-color', 'var(--color-border)', 'Controls branch guide color.'],
  [
    '--tree-view-indent-guide-width',
    'var(--border-width-sm)',
    'Customizes tree view indent guide width.',
  ],
  ['--tree-view-indicator-color', 'currentColor', 'Customizes tree view indicator color.'],
  ['--tree-view-indicator-icon-size', '0.875rem', 'Customizes tree view indicator icon size.'],
  ['--tree-view-indicator-size', '1rem', 'Customizes tree view indicator size.'],
  ['--tree-view-item-bg', 'transparent', 'Customizes tree view item bg.'],
  ['--tree-view-item-border-color', 'transparent', 'Customizes tree view item border color.'],
  ['--tree-view-item-border-width', '0', 'Customizes tree view item border width.'],
  [
    '--tree-view-item-color',
    'var(--tree-view-color, var(--color-foreground))',
    'Customizes tree view item color.',
  ],
  [
    '--tree-view-item-disabled-color',
    'var(--color-muted-foreground)',
    'Customizes tree view item disabled color.',
  ],
  ['--tree-view-item-font-size', 'var(--text-sm)', 'Customizes tree view item font size.'],
  ['--tree-view-item-gap', 'var(--spacing-2)', 'Customizes tree view item gap.'],
  ['--tree-view-item-hover-bg', 'var(--color-accent)', 'Controls row hover background.'],
  [
    '--tree-view-item-hover-color',
    'var(--color-accent-foreground)',
    'Customizes tree view item hover color.',
  ],
  [
    '--tree-view-item-line-height',
    'var(--line-height-text-sm)',
    'Customizes tree view item line height.',
  ],
  ['--tree-view-item-min-height', '2rem', 'Controls branch and item row height.'],
  ['--tree-view-item-padding-x', 'var(--spacing-2)', 'Customizes tree view item padding x.'],
  ['--tree-view-item-padding-y', 'var(--spacing-1)', 'Customizes tree view item padding y.'],
  ['--tree-view-item-radius', 'var(--radius-sm)', 'Customizes tree view item radius.'],
  ['--tree-view-item-selected-bg', 'var(--color-accent)', 'Controls selected row background.'],
  [
    '--tree-view-item-selected-color',
    'var(--color-accent-foreground)',
    'Customizes tree view item selected color.',
  ],
  ['--tree-view-item-text-gap', 'var(--spacing-2)', 'Customizes tree view item text gap.'],
  [
    '--tree-view-label-color',
    'var(--tree-view-color, var(--color-foreground))',
    'Customizes tree view label color.',
  ],
  ['--tree-view-label-font-size', 'var(--text-sm)', 'Customizes tree view label font size.'],
  [
    '--tree-view-label-font-weight',
    'var(--weight-medium)',
    'Customizes tree view label font weight.',
  ],
  [
    '--tree-view-label-line-height',
    'var(--line-height-text-sm)',
    'Customizes tree view label line height.',
  ],
  ['--tree-view-max-width', '100%', 'Customizes tree view max width.'],
  ['--tree-view-node-icon-size', '1rem', 'Controls file and folder icon size.'],
  [
    '--tree-view-rename-input-bg',
    'var(--color-background)',
    'Customizes tree view rename input bg.',
  ],
  [
    '--tree-view-rename-input-border-color',
    'var(--color-ring)',
    'Customizes tree view rename input border color.',
  ],
  [
    '--tree-view-rename-input-border-width',
    'var(--border-width-sm)',
    'Customizes tree view rename input border width.',
  ],
  [
    '--tree-view-rename-input-color',
    'var(--color-foreground)',
    'Customizes tree view rename input color.',
  ],
  [
    '--tree-view-rename-input-padding-x',
    'var(--spacing-1)',
    'Customizes tree view rename input padding x.',
  ],
  ['--tree-view-rename-input-padding-y', '0', 'Customizes tree view rename input padding y.'],
  [
    '--tree-view-rename-input-radius',
    'var(--radius-xs)',
    'Customizes tree view rename input radius.',
  ],
  ['--tree-view-root-gap', 'var(--spacing-2)', 'Customizes tree view root gap.'],
  ['--tree-view-transition', 'var(--transition-default)', 'Customizes tree view transition.'],
  ['--tree-view-width', '20rem', 'Controls the root width.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function TreeViewCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={treeViewOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function TreeViewExample() {
  return (
    <TreeView collection={collection} defaultExpandedValue={['src']} className={styles.root}>
      <TreeView.Label>Project files</TreeView.Label>
      <TreeView.Tree>
        {collection.rootNode.children?.map((node, index) => (
          <FileTreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView>
  );
}

export function ControlledExpandedTreeViewExample() {
  const [expandedValue, setExpandedValue] = useState(['src'] as string[]);

  return (
    <Stack>
      <TreeView
        collection={collection}
        expandedValue={expandedValue}
        onExpandedChange={(details) => setExpandedValue(details.expandedValue)}
        className={styles.root}
      >
        <TreeView.Label>Expanded folders</TreeView.Label>
        <TreeView.Tree>
          {collection.rootNode.children?.map((node, index) => (
            <FileTreeNode key={node.id} node={node} indexPath={[index]} />
          ))}
        </TreeView.Tree>
      </TreeView>
      <output className={styles.output}>expanded: {expandedValue.join(', ') || 'none'}</output>
    </Stack>
  );
}

export function ControlledSelectedTreeViewExample() {
  const [selectedValue, setSelectedValue] = useState(['package.json'] as string[]);

  return (
    <Stack>
      <TreeView
        collection={collection}
        selectedValue={selectedValue}
        onSelectionChange={(details) => setSelectedValue(details.selectedValue)}
        className={styles.root}
      >
        <TreeView.Label>Selected file</TreeView.Label>
        <TreeView.Tree>
          {collection.rootNode.children?.map((node, index) => (
            <FileTreeNode key={node.id} node={node} indexPath={[index]} />
          ))}
        </TreeView.Tree>
      </TreeView>
      <output className={styles.output}>selected: {selectedValue.join(', ') || 'none'}</output>
    </Stack>
  );
}

export function CheckboxTreeViewExample() {
  return (
    <TreeView
      collection={collection}
      defaultExpandedValue={['src']}
      defaultCheckedValue={['src/App.tsx']}
      className={styles.root}
    >
      <TreeView.Label>Checked files</TreeView.Label>
      <TreeView.Tree>
        {collection.rootNode.children?.map((node, index) => (
          <CheckboxFileTreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView>
  );
}

export function DisabledNodeTreeViewExample() {
  return (
    <TreeView
      collection={disabledCollection}
      defaultExpandedValue={['src']}
      className={styles.root}
    >
      <TreeView.Label>Disabled files</TreeView.Label>
      <TreeView.Tree>
        {disabledCollection.rootNode.children?.map((node, index) => (
          <FileTreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView>
  );
}

export function ExpandCollapseTreeViewExample() {
  const treeView = useTreeView({ collection, defaultExpandedValue: ['src'] });
  const branchValues = treeView.collection.getBranchValues();
  const expanded = branchValues.every((value) => treeView.expandedValue.includes(value));

  return (
    <Stack>
      <ExpandCollapseControls
        expanded={expanded}
        onToggle={() => (expanded ? treeView.collapse() : treeView.expand())}
      />
      <TreeView.RootProvider value={treeView} className={styles.root}>
        <TreeView.Tree>
          {collection.rootNode.children?.map((node, index) => (
            <FileTreeNode key={node.id} node={node} indexPath={[index]} />
          ))}
        </TreeView.Tree>
      </TreeView.RootProvider>
    </Stack>
  );
}

export function FilteringTreeViewExample() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return collection;
    return collection.filter((node) => node.name.toLowerCase().includes(value));
  }, [query]);

  return (
    <Stack>
      <input
        className={styles.searchInput}
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        placeholder="Search files"
      />
      <TreeView collection={filtered} className={styles.root}>
        <TreeView.Label>Filtered files</TreeView.Label>
        <TreeView.Tree>
          {filtered.rootNode.children?.map((node, index) => (
            <FileTreeNode key={node.id} node={node} indexPath={[index]} />
          ))}
        </TreeView.Tree>
      </TreeView>
    </Stack>
  );
}

export function AsyncTreeViewExample() {
  const [source, setSource] = useState(asyncCollection);

  return (
    <TreeView
      collection={source}
      loadChildren={loadChildren}
      onLoadChildrenComplete={(details) => setSource(details.collection)}
      className={styles.root}
    >
      <TreeView.Label>Lazy folders</TreeView.Label>
      <TreeView.Tree>
        {source.rootNode.children?.map((node, index) => (
          <FileTreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView>
  );
}

export function LazyMountTreeViewExample() {
  return (
    <TreeView
      collection={collection}
      defaultExpandedValue={['src']}
      lazyMount
      unmountOnExit
      className={styles.root}
    >
      <TreeView.Label>Lazy mounted folders</TreeView.Label>
      <TreeView.Tree>
        {collection.rootNode.children?.map((node, index) => (
          <FileTreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView>
  );
}

export function RenameTreeViewExample() {
  const [source, setSource] = useState(collection);

  return (
    <TreeView
      collection={source}
      canRename={() => true}
      onRenameComplete={(details) => {
        setSource((current) => {
          const node = current.at(details.indexPath);
          if (!node) return current;
          return current.replace(details.indexPath, { ...node, name: details.label });
        });
      }}
      className={styles.root}
    >
      <TreeView.Label>Rename with F2</TreeView.Label>
      <TreeView.Tree>
        {source.rootNode.children?.map((node, index) => (
          <RenamableFileTreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView>
  );
}

export function RootProviderTreeViewExample() {
  const treeView = useTreeView({ collection, defaultSelectedValue: ['README.md'] });

  return (
    <Stack>
      <TreeView.RootProvider value={treeView} className={styles.root}>
        <TreeView.Label>Root provider</TreeView.Label>
        <TreeView.Tree>
          {collection.rootNode.children?.map((node, index) => (
            <FileTreeNode key={node.id} node={node} indexPath={[index]} />
          ))}
        </TreeView.Tree>
      </TreeView.RootProvider>
      <output className={styles.output}>
        selected: {treeView.selectedValue.join(', ') || 'none'}
      </output>
    </Stack>
  );
}

export function AdvancedCustomizationTreeViewExample() {
  return (
    <TreeView collection={linksCollection} defaultExpandedValue={['docs']} className={styles.root}>
      <TreeView.Label>Documentation</TreeView.Label>
      <TreeView.Tree>
        {linksCollection.rootNode.children?.map((node, index) => (
          <LinkFileTreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView>
  );
}

export function CustomStyledTreeViewExample() {
  return (
    <TreeView
      collection={collection}
      defaultExpandedValue={['src', 'src/components']}
      className={styles.customRoot}
    >
      <TreeView.Label>Custom styled files</TreeView.Label>
      <TreeView.Tree>
        {collection.rootNode.children?.map((node, index) => (
          <FileTreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView>
  );
}