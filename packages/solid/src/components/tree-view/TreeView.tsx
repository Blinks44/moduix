import { ark, type HTMLArkProps } from '@ark-ui/solid/factory';
import {
  TreeView as TreeViewPrimitive,
  createFileTreeCollection,
  createTreeCollection,
  type TreeCollection,
  type TreeNode,
  type TreeViewBranchContentProps,
  type TreeViewBranchControlProps,
  type TreeViewBranchIndentGuideProps,
  type TreeViewBranchIndicatorProps,
  type TreeViewBranchProps,
  type TreeViewBranchTextProps,
  type TreeViewBranchTriggerProps,
  type TreeViewCheckedChangeDetails,
  type TreeViewContextProps,
  type TreeViewExpandedChangeDetails,
  type TreeViewFocusChangeDetails,
  type TreeViewItemIndicatorProps,
  type TreeViewItemProps,
  type TreeViewItemTextProps,
  type TreeViewLabelProps,
  type TreeViewLoadChildrenCompleteDetails,
  type TreeViewLoadChildrenDetails,
  type TreeViewLoadChildrenErrorDetails,
  type TreeViewNodeCheckboxIndicatorBaseProps,
  type TreeViewNodeCheckboxProps,
  type TreeViewNodeContextProps,
  type TreeViewNodeProviderProps,
  type TreeViewNodeRenameInputProps,
  type TreeViewNodeState,
  type TreeViewRenameCompleteDetails,
  type TreeViewRenameStartDetails,
  type TreeViewRootProps,
  type TreeViewRootProviderProps,
  type TreeViewSelectionChangeDetails,
  type TreeViewTreeProps,
  type UseTreeViewContext,
  type UseTreeViewNodeContext,
  type UseTreeViewProps,
  type UseTreeViewReturn,
  useTreeView,
  useTreeViewContext,
  useTreeViewNodeContext,
} from '@ark-ui/solid/tree-view';
import { clsx } from 'clsx';
import type { Accessor, JSX } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { CheckIcon, ChevronRightIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui';
import styles from './TreeView.module.css';

function TreeView<T extends TreeNode>(props: TreeViewRootProps<T>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.Root
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="tree-view-root"
    />
  );
}

function TreeViewRootProvider<T extends TreeNode>(props: TreeViewRootProviderProps<T>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="tree-view-root-provider"
    />
  );
}

function TreeViewLabel(props: TreeViewLabelProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.Label
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="tree-view-label"
    />
  );
}

function TreeViewTree(props: TreeViewTreeProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.Tree
      class={clsx(styles.tree, local.class)}
      {...others}
      data-slot="tree-view-tree"
    />
  );
}

function TreeViewBranch(props: TreeViewBranchProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.Branch
      class={clsx(styles.branch, local.class)}
      {...others}
      data-slot="tree-view-branch"
    />
  );
}

function TreeViewBranchControl(props: TreeViewBranchControlProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.BranchControl
      class={clsx(styles.branchControl, local.class)}
      {...others}
      data-slot="tree-view-branch-control"
    />
  );
}

function TreeViewBranchTrigger(props: TreeViewBranchTriggerProps) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <TreeViewPrimitive.BranchTrigger
      class={clsx(styles.branchTrigger, local.class)}
      {...others}
      data-slot="tree-view-branch-trigger"
    >
      {resolvedChildren() ?? <ChevronRightIcon />}
    </TreeViewPrimitive.BranchTrigger>
  );
}

function TreeViewBranchIndicator(props: TreeViewBranchIndicatorProps) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <TreeViewPrimitive.BranchIndicator
      class={clsx(styles.branchIndicator, local.class)}
      {...others}
      data-slot="tree-view-branch-indicator"
    >
      {resolvedChildren() ?? <ChevronRightIcon />}
    </TreeViewPrimitive.BranchIndicator>
  );
}

function TreeViewBranchText(props: TreeViewBranchTextProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.BranchText
      class={clsx(styles.branchText, local.class)}
      {...others}
      data-slot="tree-view-branch-text"
    />
  );
}

function TreeViewBranchContent(props: TreeViewBranchContentProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.BranchContent
      class={clsx(styles.branchContent, local.class)}
      {...others}
      data-slot="tree-view-branch-content"
    />
  );
}

function TreeViewBranchIndentGuide(props: TreeViewBranchIndentGuideProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.BranchIndentGuide
      class={clsx(styles.branchIndentGuide, local.class)}
      {...others}
      data-slot="tree-view-branch-indent-guide"
    />
  );
}

function TreeViewItem(props: TreeViewItemProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.Item
      class={clsx(styles.item, local.class)}
      {...others}
      data-slot="tree-view-item"
    />
  );
}

function TreeViewItemText(props: TreeViewItemTextProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.ItemText
      class={clsx(styles.itemText, local.class)}
      {...others}
      data-slot="tree-view-item-text"
    />
  );
}

function TreeViewItemIndicator(props: TreeViewItemIndicatorProps) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <TreeViewPrimitive.ItemIndicator
      class={clsx(styles.itemIndicator, local.class)}
      {...others}
      data-slot="tree-view-item-indicator"
    >
      {resolvedChildren() ?? <CheckIcon />}
    </TreeViewPrimitive.ItemIndicator>
  );
}

function TreeViewNodeCheckbox(props: TreeViewNodeCheckboxProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.NodeCheckbox
      class={clsx(styles.nodeCheckbox, local.class)}
      {...others}
      data-slot="tree-view-node-checkbox"
    />
  );
}

type TreeViewNodeCheckboxIndicatorProps = TreeViewNodeCheckboxIndicatorBaseProps &
  Omit<HTMLArkProps<'span'>, 'children'>;

function TreeViewNodeCheckboxIndicator(props: TreeViewNodeCheckboxIndicatorProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'fallback', 'indeterminate']);
  const resolvedChildren = children(() => local.children);

  return (
    <ark.span
      class={clsx(styles.nodeCheckboxIndicator, local.class)}
      {...others}
      data-slot="tree-view-node-checkbox-indicator"
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

function TreeViewNodeRenameInput(props: TreeViewNodeRenameInputProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.NodeRenameInput
      class={clsx(styles.nodeRenameInput, local.class)}
      {...others}
      data-slot="tree-view-node-rename-input"
    />
  );
}

const TreeViewNodeProvider = TreeViewPrimitive.NodeProvider;
const TreeViewContext = TreeViewPrimitive.Context;
const TreeViewNodeContext = TreeViewPrimitive.NodeContext;

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

export {
  TreeView,
  TreeViewContext,
  TreeViewNodeContext,
  TreeViewNodeProvider,
  TreeViewLabel,
  TreeViewTree,
  TreeViewNode,
  TreeViewBranch,
  TreeViewBranchControl,
  TreeViewBranchTrigger,
  TreeViewBranchIndicator,
  TreeViewBranchText,
  TreeViewBranchContent,
  TreeViewBranchIndentGuide,
  TreeViewItem,
  TreeViewItemText,
  TreeViewItemIndicator,
  TreeViewNodeCheckbox,
  TreeViewNodeCheckboxIndicator,
  TreeViewNodeRenameInput,
  TreeViewRootProvider,
  createFileTreeCollection,
  createTreeCollection,
  useTreeView,
  useTreeViewContext,
  useTreeViewNodeContext,
  type TreeCollection,
  type TreeNode,
  type TreeViewBranchContentProps,
  type TreeViewBranchControlProps,
  type TreeViewBranchIndentGuideProps,
  type TreeViewBranchIndicatorProps,
  type TreeViewBranchProps,
  type TreeViewBranchTextProps,
  type TreeViewBranchTriggerProps,
  type TreeViewCheckedChangeDetails,
  type TreeViewContextProps,
  type TreeViewExpandedChangeDetails,
  type TreeViewFocusChangeDetails,
  type TreeViewItemIndicatorProps,
  type TreeViewItemProps,
  type TreeViewItemTextProps,
  type TreeViewLabelProps,
  type TreeViewLoadChildrenCompleteDetails,
  type TreeViewLoadChildrenDetails,
  type TreeViewLoadChildrenErrorDetails,
  type TreeViewNodeCheckboxIndicatorProps,
  type TreeViewNodeCheckboxProps,
  type TreeViewNodeContextProps,
  type TreeViewNodeProps,
  type TreeViewNodeProviderProps,
  type TreeViewNodeRenameInputProps,
  type TreeViewNodeRenderProps,
  type TreeViewNodeState,
  type TreeViewRenameCompleteDetails,
  type TreeViewRenameStartDetails,
  type TreeViewRootProps,
  type TreeViewRootProviderProps,
  type TreeViewSelectionChangeDetails,
  type TreeViewTreeProps,
  type UseTreeViewContext,
  type UseTreeViewNodeContext,
  type UseTreeViewProps,
  type UseTreeViewReturn,
};