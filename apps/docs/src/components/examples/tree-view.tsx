import {
  Button,
  TreeView,
  type TreeViewLoadChildrenDetails,
  type TreeViewNodeProviderProps,
  createTreeCollection,
  useTreeView,
  useTreeViewNodeContext,
} from '@moduix/react';
import {
  File as FileIcon,
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
  RotateCcw as RestartIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';
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
    --moduix-tree-view-width: 22rem;
  }
`;

const treeViewOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-tree-view-checkbox-bg',
    'var(--moduix-color-background)',
    'Customizes tree view checkbox bg.',
  ],
  [
    '--moduix-tree-view-checkbox-border-color',
    'var(--moduix-color-border)',
    'Customizes tree view checkbox border color.',
  ],
  [
    '--moduix-tree-view-checkbox-border-width',
    'var(--moduix-border-width-sm)',
    'Customizes tree view checkbox border width.',
  ],
  [
    '--moduix-tree-view-checkbox-checked-bg',
    'var(--moduix-color-primary)',
    'Customizes tree view checkbox checked bg.',
  ],
  [
    '--moduix-tree-view-checkbox-color',
    'var(--moduix-color-primary-foreground)',
    'Customizes tree view checkbox color.',
  ],
  [
    '--moduix-tree-view-checkbox-focus-ring-offset',
    'var(--moduix-border-width-sm)',
    'Customizes tree view checkbox focus ring offset.',
  ],
  [
    '--moduix-tree-view-checkbox-icon-size',
    'var(--moduix-spacing-3)',
    'Customizes tree view checkbox icon size.',
  ],
  [
    '--moduix-tree-view-checkbox-radius',
    'var(--moduix-radius-xs)',
    'Customizes tree view checkbox radius.',
  ],
  ['--moduix-tree-view-checkbox-size', 'var(--moduix-spacing-4)', 'Controls node checkbox size.'],
  ['--moduix-tree-view-color', 'var(--moduix-color-foreground)', 'Controls text and icon color.'],
  [
    '--moduix-tree-view-content-transition-duration',
    '150ms',
    'Customizes tree view content transition duration.',
  ],
  [
    '--moduix-tree-view-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Customizes tree view disabled opacity.',
  ],
  [
    '--moduix-tree-view-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls row and checkbox focus rings.',
  ],
  [
    '--moduix-tree-view-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Customizes tree view focus ring width.',
  ],
  ['--moduix-tree-view-indent', '1rem', 'Controls nested row indentation.'],
  [
    '--moduix-tree-view-indent-guide-color',
    'var(--moduix-color-border)',
    'Controls branch guide color.',
  ],
  [
    '--moduix-tree-view-indent-guide-width',
    'var(--moduix-border-width-sm)',
    'Customizes tree view indent guide width.',
  ],
  ['--moduix-tree-view-indicator-color', 'currentColor', 'Customizes tree view indicator color.'],
  [
    '--moduix-tree-view-indicator-icon-size',
    'var(--moduix-spacing-3-5)',
    'Customizes tree view indicator icon size.',
  ],
  [
    '--moduix-tree-view-indicator-size',
    'var(--moduix-spacing-4)',
    'Customizes tree view indicator size.',
  ],
  ['--moduix-tree-view-item-bg', 'transparent', 'Customizes tree view item bg.'],
  [
    '--moduix-tree-view-item-border-color',
    'transparent',
    'Customizes tree view item border color.',
  ],
  ['--moduix-tree-view-item-border-width', '0', 'Customizes tree view item border width.'],
  [
    '--moduix-tree-view-item-color',
    'var(--moduix-tree-view-color, var(--moduix-color-foreground))',
    'Customizes tree view item color.',
  ],
  [
    '--moduix-tree-view-item-disabled-color',
    'var(--moduix-color-muted-foreground)',
    'Customizes tree view item disabled color.',
  ],
  [
    '--moduix-tree-view-item-font-size',
    'var(--moduix-text-sm)',
    'Customizes tree view item font size.',
  ],
  ['--moduix-tree-view-item-gap', 'var(--moduix-spacing-2)', 'Customizes tree view item gap.'],
  [
    '--moduix-tree-view-item-hover-bg',
    'var(--moduix-color-accent)',
    'Controls row hover background.',
  ],
  [
    '--moduix-tree-view-item-hover-color',
    'var(--moduix-color-accent-foreground)',
    'Customizes tree view item hover color.',
  ],
  [
    '--moduix-tree-view-item-line-height',
    'var(--moduix-line-height-text-sm)',
    'Customizes tree view item line height.',
  ],
  [
    '--moduix-tree-view-item-min-height',
    'var(--moduix-size-sm)',
    'Controls branch and item row height.',
  ],
  [
    '--moduix-tree-view-item-padding-x',
    'var(--moduix-spacing-2)',
    'Customizes tree view item padding x.',
  ],
  [
    '--moduix-tree-view-item-padding-y',
    'var(--moduix-spacing-1)',
    'Customizes tree view item padding y.',
  ],
  [
    '--moduix-tree-view-item-radius',
    'var(--moduix-radius-sm)',
    'Customizes tree view item radius.',
  ],
  [
    '--moduix-tree-view-item-selected-bg',
    'var(--moduix-color-accent)',
    'Controls selected row background.',
  ],
  [
    '--moduix-tree-view-item-selected-color',
    'var(--moduix-color-accent-foreground)',
    'Customizes tree view item selected color.',
  ],
  [
    '--moduix-tree-view-item-text-gap',
    'var(--moduix-spacing-2)',
    'Customizes tree view item text gap.',
  ],
  [
    '--moduix-tree-view-label-color',
    'var(--moduix-tree-view-color, var(--moduix-color-foreground))',
    'Customizes tree view label color.',
  ],
  [
    '--moduix-tree-view-label-font-size',
    'var(--moduix-text-sm)',
    'Customizes tree view label font size.',
  ],
  [
    '--moduix-tree-view-label-font-weight',
    'var(--moduix-weight-medium)',
    'Customizes tree view label font weight.',
  ],
  [
    '--moduix-tree-view-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Customizes tree view label line height.',
  ],
  ['--moduix-tree-view-max-width', '100%', 'Customizes tree view max width.'],
  [
    '--moduix-tree-view-node-icon-size',
    'var(--moduix-spacing-4)',
    'Controls file and folder icon size.',
  ],
  [
    '--moduix-tree-view-rename-input-bg',
    'var(--moduix-color-background)',
    'Customizes tree view rename input bg.',
  ],
  [
    '--moduix-tree-view-rename-input-border-color',
    'var(--moduix-color-ring)',
    'Customizes tree view rename input border color.',
  ],
  [
    '--moduix-tree-view-rename-input-border-width',
    'var(--moduix-border-width-sm)',
    'Customizes tree view rename input border width.',
  ],
  [
    '--moduix-tree-view-rename-input-color',
    'var(--moduix-color-foreground)',
    'Customizes tree view rename input color.',
  ],
  [
    '--moduix-tree-view-rename-input-padding-x',
    'var(--moduix-spacing-1)',
    'Customizes tree view rename input padding x.',
  ],
  [
    '--moduix-tree-view-rename-input-padding-y',
    '0',
    'Customizes tree view rename input padding y.',
  ],
  [
    '--moduix-tree-view-rename-input-radius',
    'var(--moduix-radius-xs)',
    'Customizes tree view rename input radius.',
  ],
  ['--moduix-tree-view-root-gap', 'var(--moduix-spacing-2)', 'Customizes tree view root gap.'],
  [
    '--moduix-tree-view-transition',
    'var(--moduix-transition-default)',
    'Customizes tree view transition.',
  ],
  ['--moduix-tree-view-width', '20rem', 'Controls the root width.'],
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