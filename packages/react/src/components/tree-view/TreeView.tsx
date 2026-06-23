import type { ComponentProps, ComponentRef, ForwardedRef } from 'react';
import {
  TreeView as TreeViewPrimitive,
  createFileTreeCollection,
  createTreeCollection,
  type TreeNode,
  type TreeViewRootComponent,
  type TreeViewRootProps,
  type TreeViewRootProviderComponent,
  type TreeViewRootProviderProps,
  useTreeView,
  useTreeViewContext,
  useTreeViewNodeContext,
} from '@ark-ui/react/tree-view';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { CheckIcon, ChevronRightIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './TreeView.module.css';

const TreeViewRoot = forwardRef(function TreeViewRoot<T extends TreeNode>(
  { className, ...props }: TreeViewRootProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <TreeViewPrimitive.Root
      ref={ref}
      data-slot="tree-view-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
}) as TreeViewRootComponent;

const TreeViewRootProvider = forwardRef(function TreeViewRootProvider<T extends TreeNode>(
  { className, ...props }: TreeViewRootProviderProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <TreeViewPrimitive.RootProvider
      ref={ref}
      data-slot="tree-view-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
}) as TreeViewRootProviderComponent;

const TreeViewLabel = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.Label>,
  ComponentProps<typeof TreeViewPrimitive.Label>
>(function TreeViewLabel({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.Label
      ref={ref}
      data-slot="tree-view-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
    />
  );
});

const TreeViewTree = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.Tree>,
  ComponentProps<typeof TreeViewPrimitive.Tree>
>(function TreeViewTree({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.Tree
      ref={ref}
      data-slot="tree-view-tree"
      className={clsx(styles.tree, normalizeClassName(className))}
      {...props}
    />
  );
});

const TreeViewBranch = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.Branch>,
  ComponentProps<typeof TreeViewPrimitive.Branch>
>(function TreeViewBranch({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.Branch
      ref={ref}
      data-slot="tree-view-branch"
      className={clsx(styles.branch, normalizeClassName(className))}
      {...props}
    />
  );
});

const TreeViewBranchControl = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.BranchControl>,
  ComponentProps<typeof TreeViewPrimitive.BranchControl>
>(function TreeViewBranchControl({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.BranchControl
      ref={ref}
      data-slot="tree-view-branch-control"
      className={clsx(styles.branchControl, normalizeClassName(className))}
      {...props}
    />
  );
});

const TreeViewBranchTrigger = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.BranchTrigger>,
  ComponentProps<typeof TreeViewPrimitive.BranchTrigger>
>(function TreeViewBranchTrigger({ className, children, ...props }, ref) {
  return (
    <TreeViewPrimitive.BranchTrigger
      ref={ref}
      data-slot="tree-view-branch-trigger"
      className={clsx(styles.branchTrigger, normalizeClassName(className))}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </TreeViewPrimitive.BranchTrigger>
  );
});

const TreeViewBranchIndicator = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.BranchIndicator>,
  ComponentProps<typeof TreeViewPrimitive.BranchIndicator>
>(function TreeViewBranchIndicator({ className, children, ...props }, ref) {
  return (
    <TreeViewPrimitive.BranchIndicator
      ref={ref}
      data-slot="tree-view-branch-indicator"
      className={clsx(styles.branchIndicator, normalizeClassName(className))}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </TreeViewPrimitive.BranchIndicator>
  );
});

const TreeViewBranchText = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.BranchText>,
  ComponentProps<typeof TreeViewPrimitive.BranchText>
>(function TreeViewBranchText({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.BranchText
      ref={ref}
      data-slot="tree-view-branch-text"
      className={clsx(styles.branchText, normalizeClassName(className))}
      {...props}
    />
  );
});

const TreeViewBranchContent = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.BranchContent>,
  ComponentProps<typeof TreeViewPrimitive.BranchContent>
>(function TreeViewBranchContent({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.BranchContent
      ref={ref}
      data-slot="tree-view-branch-content"
      className={clsx(styles.branchContent, normalizeClassName(className))}
      {...props}
    />
  );
});

const TreeViewBranchIndentGuide = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.BranchIndentGuide>,
  ComponentProps<typeof TreeViewPrimitive.BranchIndentGuide>
>(function TreeViewBranchIndentGuide({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.BranchIndentGuide
      ref={ref}
      data-slot="tree-view-branch-indent-guide"
      className={clsx(styles.branchIndentGuide, normalizeClassName(className))}
      {...props}
    />
  );
});

const TreeViewItem = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.Item>,
  ComponentProps<typeof TreeViewPrimitive.Item>
>(function TreeViewItem({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.Item
      ref={ref}
      data-slot="tree-view-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
    />
  );
});

const TreeViewItemText = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.ItemText>,
  ComponentProps<typeof TreeViewPrimitive.ItemText>
>(function TreeViewItemText({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.ItemText
      ref={ref}
      data-slot="tree-view-item-text"
      className={clsx(styles.itemText, normalizeClassName(className))}
      {...props}
    />
  );
});

const TreeViewItemIndicator = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.ItemIndicator>,
  ComponentProps<typeof TreeViewPrimitive.ItemIndicator>
>(function TreeViewItemIndicator({ className, children, ...props }, ref) {
  return (
    <TreeViewPrimitive.ItemIndicator
      ref={ref}
      data-slot="tree-view-item-indicator"
      className={clsx(styles.itemIndicator, normalizeClassName(className))}
      {...props}
    >
      {children ?? <CheckIcon />}
    </TreeViewPrimitive.ItemIndicator>
  );
});

const TreeViewNodeCheckbox = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.NodeCheckbox>,
  ComponentProps<typeof TreeViewPrimitive.NodeCheckbox>
>(function TreeViewNodeCheckbox({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.NodeCheckbox
      ref={ref}
      data-slot="tree-view-node-checkbox"
      className={clsx(styles.nodeCheckbox, normalizeClassName(className))}
      {...props}
    />
  );
});

function TreeViewNodeCheckboxIndicator({
  className,
  children,
  indeterminate,
  ...props
}: ComponentProps<typeof TreeViewPrimitive.NodeCheckboxIndicator>) {
  return (
    <TreeViewPrimitive.NodeCheckboxIndicator
      data-slot="tree-view-node-checkbox-indicator"
      className={clsx(styles.nodeCheckboxIndicator, normalizeClassName(className))}
      indeterminate={indeterminate ?? <IndeterminateIcon />}
      {...props}
    >
      {children ?? <CheckIcon />}
    </TreeViewPrimitive.NodeCheckboxIndicator>
  );
}

const TreeViewNodeRenameInput = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.NodeRenameInput>,
  ComponentProps<typeof TreeViewPrimitive.NodeRenameInput>
>(function TreeViewNodeRenameInput({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.NodeRenameInput
      ref={ref}
      data-slot="tree-view-node-rename-input"
      className={clsx(styles.nodeRenameInput, normalizeClassName(className))}
      {...props}
    />
  );
});

const TreeViewContext = TreeViewPrimitive.Context;
const TreeViewNodeContext = TreeViewPrimitive.NodeContext;
const TreeViewNodeProvider = TreeViewPrimitive.NodeProvider;

const TreeView = Object.assign(TreeViewRoot, {
  Root: TreeViewRoot,
  RootProvider: TreeViewRootProvider,
  Label: TreeViewLabel,
  Tree: TreeViewTree,
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
  Context: TreeViewContext,
  NodeContext: TreeViewNodeContext,
});

export {
  TreeView,
  createFileTreeCollection,
  createTreeCollection,
  useTreeView,
  useTreeViewContext,
  useTreeViewNodeContext,
};
export type {
  TreeCollection,
  TreeNode,
  TreeViewBranchBaseProps,
  TreeViewBranchContentBaseProps,
  TreeViewBranchContentProps,
  TreeViewBranchControlBaseProps,
  TreeViewBranchControlProps,
  TreeViewBranchIndentGuideBaseProps,
  TreeViewBranchIndentGuideProps,
  TreeViewBranchIndicatorBaseProps,
  TreeViewBranchIndicatorProps,
  TreeViewBranchProps,
  TreeViewBranchTextBaseProps,
  TreeViewBranchTextProps,
  TreeViewBranchTriggerBaseProps,
  TreeViewBranchTriggerProps,
  TreeViewCheckedChangeDetails,
  TreeViewContextProps,
  TreeViewExpandedChangeDetails,
  TreeViewFocusChangeDetails,
  TreeViewItemBaseProps,
  TreeViewItemIndicatorBaseProps,
  TreeViewItemIndicatorProps,
  TreeViewItemProps,
  TreeViewItemTextBaseProps,
  TreeViewItemTextProps,
  TreeViewLabelBaseProps,
  TreeViewLabelProps,
  TreeViewLoadChildrenCompleteDetails,
  TreeViewLoadChildrenDetails,
  TreeViewLoadChildrenErrorDetails,
  TreeViewNodeCheckboxBaseProps,
  TreeViewNodeCheckboxIndicatorBaseProps,
  TreeViewNodeCheckboxIndicatorProps,
  TreeViewNodeCheckboxProps,
  TreeViewNodeContextProps,
  TreeViewNodeProps,
  TreeViewNodeProviderBaseProps,
  TreeViewNodeProviderProps,
  TreeViewNodeRenameInputBaseProps,
  TreeViewNodeRenameInputProps,
  TreeViewNodeState,
  TreeViewRenameCompleteDetails,
  TreeViewRenameStartDetails,
  TreeViewRootBaseProps,
  TreeViewRootComponent,
  TreeViewRootComponentProps,
  TreeViewRootProps,
  TreeViewRootProviderBaseProps,
  TreeViewRootProviderComponent,
  TreeViewRootProviderProps,
  TreeViewSelectionChangeDetails,
  TreeViewTreeBaseProps,
  TreeViewTreeProps,
  UseTreeViewContext,
  UseTreeViewNodeContext,
  UseTreeViewProps,
  UseTreeViewReturn,
} from '@ark-ui/react/tree-view';