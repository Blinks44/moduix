import { ark, type HTMLArkProps } from '@ark-ui/solid/factory';
import {
  TreeView as TreeViewPrimitive,
  createFileTreeCollection,
  createTreeCollection,
  type TreeNode,
  type TreeViewLoadChildrenDetails,
  type TreeViewNodeProviderProps,
  type TreeViewNodeState,
  type TreeViewRootComponent,
  type TreeViewRootProps,
  type TreeViewRootProviderComponent,
  type TreeViewRootProviderProps,
  useTreeView,
  useTreeViewContext,
  useTreeViewNodeContext,
} from '@ark-ui/solid/tree-view';
import { clsx } from 'clsx';
import type { Accessor, ComponentProps, JSX } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { CheckIcon, ChevronRightIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './TreeView.module.css';

const TreeViewRoot = function TreeViewRoot<T extends TreeNode>(props: TreeViewRootProps<T>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <TreeViewPrimitive.Root
      asChild={local.asChild}
      data-slot="tree-view-root"
      class={clsx(styles.root, local.class)}
      {...others}
    >
      {local.children}
    </TreeViewPrimitive.Root>
  );
} as TreeViewRootComponent;

const TreeViewRootProvider = function TreeViewRootProvider<T extends TreeNode>(
  props: TreeViewRootProviderProps<T>,
) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <TreeViewPrimitive.RootProvider
      asChild={local.asChild}
      data-slot="tree-view-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
    >
      {local.children}
    </TreeViewPrimitive.RootProvider>
  );
} as TreeViewRootProviderComponent;

function TreeViewLabel(props: ComponentProps<typeof TreeViewPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.Label
      data-slot="tree-view-label"
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

function TreeViewTree(props: ComponentProps<typeof TreeViewPrimitive.Tree>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.Tree
      data-slot="tree-view-tree"
      class={clsx(styles.tree, local.class)}
      {...others}
    />
  );
}

function TreeViewBranch(props: ComponentProps<typeof TreeViewPrimitive.Branch>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.Branch
      data-slot="tree-view-branch"
      class={clsx(styles.branch, local.class)}
      {...others}
    />
  );
}

function TreeViewBranchControl(props: ComponentProps<typeof TreeViewPrimitive.BranchControl>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.BranchControl
      data-slot="tree-view-branch-control"
      class={clsx(styles.branchControl, local.class)}
      {...others}
    />
  );
}

function TreeViewBranchTrigger(props: ComponentProps<typeof TreeViewPrimitive.BranchTrigger>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <TreeViewPrimitive.BranchTrigger
      data-slot="tree-view-branch-trigger"
      class={clsx(styles.branchTrigger, local.class)}
      {...others}
    >
      {resolvedChildren() ?? <ChevronRightIcon />}
    </TreeViewPrimitive.BranchTrigger>
  );
}

function TreeViewBranchIndicator(props: ComponentProps<typeof TreeViewPrimitive.BranchIndicator>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <TreeViewPrimitive.BranchIndicator
      data-slot="tree-view-branch-indicator"
      class={clsx(styles.branchIndicator, local.class)}
      {...others}
    >
      {resolvedChildren() ?? <ChevronRightIcon />}
    </TreeViewPrimitive.BranchIndicator>
  );
}

function TreeViewBranchText(props: ComponentProps<typeof TreeViewPrimitive.BranchText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.BranchText
      data-slot="tree-view-branch-text"
      class={clsx(styles.branchText, local.class)}
      {...others}
    />
  );
}

function TreeViewBranchContent(props: ComponentProps<typeof TreeViewPrimitive.BranchContent>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.BranchContent
      data-slot="tree-view-branch-content"
      class={clsx(styles.branchContent, local.class)}
      {...others}
    />
  );
}

function TreeViewBranchIndentGuide(
  props: ComponentProps<typeof TreeViewPrimitive.BranchIndentGuide>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.BranchIndentGuide
      data-slot="tree-view-branch-indent-guide"
      class={clsx(styles.branchIndentGuide, local.class)}
      {...others}
    />
  );
}

function TreeViewItem(props: ComponentProps<typeof TreeViewPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.Item
      data-slot="tree-view-item"
      class={clsx(styles.item, local.class)}
      {...others}
    />
  );
}

function TreeViewItemText(props: ComponentProps<typeof TreeViewPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.ItemText
      data-slot="tree-view-item-text"
      class={clsx(styles.itemText, local.class)}
      {...others}
    />
  );
}

function TreeViewItemIndicator(props: ComponentProps<typeof TreeViewPrimitive.ItemIndicator>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <TreeViewPrimitive.ItemIndicator
      data-slot="tree-view-item-indicator"
      class={clsx(styles.itemIndicator, local.class)}
      {...others}
    >
      {resolvedChildren() ?? <CheckIcon />}
    </TreeViewPrimitive.ItemIndicator>
  );
}

function TreeViewNodeCheckbox(props: ComponentProps<typeof TreeViewPrimitive.NodeCheckbox>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.NodeCheckbox
      data-slot="tree-view-node-checkbox"
      class={clsx(styles.nodeCheckbox, local.class)}
      {...others}
    />
  );
}

type TreeViewNodeCheckboxIndicatorProps = ComponentProps<
  typeof TreeViewPrimitive.NodeCheckboxIndicator
> &
  Omit<HTMLArkProps<'span'>, 'children'>;

function TreeViewNodeCheckboxIndicator(props: TreeViewNodeCheckboxIndicatorProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'fallback',
    'indeterminate',
  ]);
  const resolvedChildren = children(() => local.children);

  return (
    <ark.span
      asChild={local.asChild}
      data-slot="tree-view-node-checkbox-indicator"
      class={clsx(styles.nodeCheckboxIndicator, local.class)}
      {...others}
    >
      <TreeViewPrimitive.NodeCheckboxIndicator
        fallback={local.fallback}
        indeterminate={local.indeterminate ?? <IndeterminateIcon />}
      >
        {resolvedChildren() ?? <CheckIcon />}
      </TreeViewPrimitive.NodeCheckboxIndicator>
    </ark.span>
  );
}

function TreeViewNodeRenameInput(props: ComponentProps<typeof TreeViewPrimitive.NodeRenameInput>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.NodeRenameInput
      data-slot="tree-view-node-rename-input"
      class={clsx(styles.nodeRenameInput, local.class)}
      {...others}
    />
  );
}

const TreeViewNodeProvider = TreeViewPrimitive.NodeProvider;

type TreeViewNodeRenderProps<T extends TreeNode> = {
  indexPath: number[];
  node: T;
  state: Accessor<TreeViewNodeState>;
};

type TreeViewNodeProps<T extends TreeNode> = {
  children: (props: TreeViewNodeRenderProps<T>) => JSX.Element;
  indexPath: number[];
  node: T;
};

function TreeViewNodeContent<T extends TreeNode>(props: TreeViewNodeProps<T>) {
  return props.children({
    indexPath: props.indexPath,
    node: props.node,
    state: useTreeViewNodeContext(),
  });
}

function TreeViewNode<T extends TreeNode>(props: TreeViewNodeProps<T>) {
  return (
    <TreeViewNodeProvider node={props.node} indexPath={props.indexPath}>
      <TreeViewNodeContent {...props} />
    </TreeViewNodeProvider>
  );
}

type TreeViewComponent = typeof TreeViewRoot & {
  Root: typeof TreeViewRoot;
  RootProvider: typeof TreeViewRootProvider;
  Context: typeof TreeViewPrimitive.Context;
  NodeContext: typeof TreeViewPrimitive.NodeContext;
  Label: typeof TreeViewLabel;
  Tree: typeof TreeViewTree;
  Node: typeof TreeViewNode;
  NodeProvider: typeof TreeViewNodeProvider;
  Branch: typeof TreeViewBranch;
  BranchControl: typeof TreeViewBranchControl;
  BranchTrigger: typeof TreeViewBranchTrigger;
  BranchIndicator: typeof TreeViewBranchIndicator;
  BranchText: typeof TreeViewBranchText;
  BranchContent: typeof TreeViewBranchContent;
  BranchIndentGuide: typeof TreeViewBranchIndentGuide;
  Item: typeof TreeViewItem;
  ItemText: typeof TreeViewItemText;
  ItemIndicator: typeof TreeViewItemIndicator;
  NodeCheckbox: typeof TreeViewNodeCheckbox;
  NodeCheckboxIndicator: typeof TreeViewNodeCheckboxIndicator;
  NodeRenameInput: typeof TreeViewNodeRenameInput;
};

const TreeView: TreeViewComponent = Object.assign(TreeViewRoot, {
  Root: TreeViewRoot,
  RootProvider: TreeViewRootProvider,
  Context: TreeViewPrimitive.Context,
  NodeContext: TreeViewPrimitive.NodeContext,
  Label: TreeViewLabel,
  Tree: TreeViewTree,
  Node: TreeViewNode,
  NodeProvider: TreeViewNodeProvider,
  Branch: TreeViewBranch,
  BranchControl: TreeViewBranchControl,
  BranchTrigger: TreeViewBranchTrigger,
  BranchIndicator: TreeViewBranchIndicator,
  BranchText: TreeViewBranchText,
  BranchContent: TreeViewBranchContent,
  BranchIndentGuide: TreeViewBranchIndentGuide,
  Item: TreeViewItem,
  ItemText: TreeViewItemText,
  ItemIndicator: TreeViewItemIndicator,
  NodeCheckbox: TreeViewNodeCheckbox,
  NodeCheckboxIndicator: TreeViewNodeCheckboxIndicator,
  NodeRenameInput: TreeViewNodeRenameInput,
});

export {
  TreeView,
  createFileTreeCollection,
  createTreeCollection,
  useTreeView,
  useTreeViewContext,
  useTreeViewNodeContext,
  type TreeViewLoadChildrenDetails,
  type TreeViewNodeProps,
  type TreeViewNodeRenderProps,
  type TreeViewNodeState,
  type TreeViewNodeProviderProps,
};