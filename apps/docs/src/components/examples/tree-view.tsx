import type { ReactNode } from 'react';
import {
  type TreeViewLoadChildrenDetails,
  type TreeViewNodeProviderProps,
  useTreeView,
  useTreeViewNodeContext,
} from '@ark-ui/react/tree-view';
import {
  CheckIcon,
  Button,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  IndeterminateIcon,
  RestartIcon,
  TreeView,
  createTreeCollection,
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
      <TreeView.NodeCheckboxIndicator indeterminate={<IndeterminateIcon />}>
        <CheckIcon />
      </TreeView.NodeCheckboxIndicator>
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

export const treeViewCustomStylingCss = `
  .tree-view-demo {
    --tree-view-width: 24rem;
    --tree-view-indent: 1.25rem;
    --tree-view-item-selected-bg: var(--color-primary);
    --tree-view-item-selected-color: var(--color-primary-foreground);
    --tree-view-indent-guide-color: color-mix(in oklab, var(--color-primary) 35%, transparent);
  }
`;

const treeViewCoreImportsCode = `import { useTreeViewNodeContext, type TreeViewNodeProviderProps } from "@ark-ui/react/tree-view";
import { FileIcon, FolderIcon, FolderOpenIcon, TreeView, createTreeCollection } from "@moduix/react";`;

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

const treeViewCheckboxImportsCode = `import { useTreeViewNodeContext, type TreeViewNodeProviderProps } from "@ark-ui/react/tree-view";
import { CheckIcon, FileIcon, FolderIcon, FolderOpenIcon, IndeterminateIcon, TreeView, createTreeCollection } from "@moduix/react";`;

const treeViewCheckboxSetupCode = `${treeViewDataSetupCode}

function NodeCheckbox() {
  return (
    <TreeView.NodeCheckbox>
      <TreeView.NodeCheckboxIndicator indeterminate={<IndeterminateIcon />}>
        <CheckIcon />
      </TreeView.NodeCheckboxIndicator>
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
  imports: `import { useTreeView, useTreeViewNodeContext, type TreeViewNodeProviderProps } from "@ark-ui/react/tree-view";
import { Button, FileIcon, FolderIcon, FolderOpenIcon, TreeView, createTreeCollection } from "@moduix/react";`,
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
  imports: `import { useTreeView, useTreeViewNodeContext, type TreeViewNodeProviderProps } from "@ark-ui/react/tree-view";
import { FileIcon, FolderIcon, FolderOpenIcon, TreeView, createTreeCollection } from "@moduix/react";`,
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

export const treeViewLinksCode = createTreeViewCode({
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
        ${createTreeNodesCode({ source: 'linksCollection', component: 'LinkFileTreeNode' })}
      </TreeView.Tree>
    </TreeView>
  );
}`,
});

export const treeViewCustomStylingCode = createTreeViewCode({
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

export const treeViewLinksData = `const linksCollection = createTreeCollection({
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
  ['--tree-view-width', '20rem', 'Controls the root width.'],
  ['--tree-view-color', 'var(--color-foreground)', 'Controls text and icon color.'],
  ['--tree-view-indent', '1rem', 'Controls nested row indentation.'],
  ['--tree-view-item-min-height', '2rem', 'Controls branch and item row height.'],
  ['--tree-view-item-hover-bg', 'var(--color-accent)', 'Controls row hover background.'],
  ['--tree-view-item-selected-bg', 'var(--color-accent)', 'Controls selected row background.'],
  ['--tree-view-focus-ring-color', 'var(--color-ring)', 'Controls row and checkbox focus rings.'],
  ['--tree-view-checkbox-size', '1rem', 'Controls node checkbox size.'],
  ['--tree-view-node-icon-size', '1rem', 'Controls file and folder icon size.'],
  ['--tree-view-indent-guide-color', 'var(--color-border)', 'Controls branch guide color.'],
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

export function LinksTreeViewExample() {
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