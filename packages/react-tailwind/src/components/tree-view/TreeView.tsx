'use client';

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
} from '@ark-ui/react/tree-view';
import type { ComponentProps, ComponentRef, ForwardedRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, ChevronRightIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui';

const TreeViewRoot = forwardRef(function TreeViewRoot<T extends TreeNode>(
  { className, ...props }: TreeViewRootProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <TreeViewPrimitive.Root
      ref={ref}
      className={cn(
        'box-border flex w-80 max-w-full min-w-0 flex-col gap-2 text-foreground data-disabled:opacity-50',
        className,
      )}
      {...props}
      data-slot="tree-view-root"
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
      className={cn(
        'box-border flex w-80 max-w-full min-w-0 flex-col gap-2 text-foreground data-disabled:opacity-50',
        className,
      )}
      {...props}
      data-slot="tree-view-root-provider"
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
      className={cn('text-sm leading-5 font-medium text-foreground select-none', className)}
      {...props}
      data-slot="tree-view-label"
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
      className={cn('flex min-w-0 flex-col gap-1 text-sm leading-5 text-foreground', className)}
      {...props}
      data-slot="tree-view-tree"
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
      className={cn('relative flex min-w-0 flex-col gap-1', className)}
      {...props}
      data-slot="tree-view-branch"
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
      className={cn(
        "relative z-0 box-border flex min-h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-sm bg-transparent py-1 ps-[calc(0.5rem+((var(--depth,1)-1)*1rem))] pe-2 text-start text-foreground no-underline transition-[color,opacity] duration-200 ease-in-out outline-none select-none [font:inherit] before:pointer-events-none before:absolute before:inset-y-0 before:start-[calc(0.5rem+((var(--depth,1)-1)*1rem))] before:end-0 before:-z-1 before:rounded-sm before:bg-transparent before:ring-1 before:ring-transparent before:transition-[background-color,box-shadow] before:duration-200 before:ease-in-out before:content-[''] before:ring-inset focus-visible:before:ring-ring data-disabled:cursor-default data-disabled:text-muted-foreground data-disabled:opacity-50 data-focus:before:ring-ring data-selected:text-accent-foreground data-selected:before:bg-accent motion-reduce:before:transition-none [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-accent-foreground [@media(hover:hover)]:[&:not([data-disabled]):hover]:before:bg-accent",
        className,
      )}
      {...props}
      data-slot="tree-view-branch-control"
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
      className={cn(
        'inline-flex size-4 shrink-0 items-center justify-center transition-transform duration-200 ease-in-out data-[state=open]:rotate-90 motion-reduce:transition-none [&_svg]:size-3.5',
        className,
      )}
      {...props}
      data-slot="tree-view-branch-trigger"
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
      className={cn(
        'inline-flex size-4 shrink-0 items-center justify-center transition-transform duration-200 ease-in-out data-[state=open]:rotate-90 motion-reduce:transition-none [&_svg]:size-3.5',
        className,
      )}
      {...props}
      data-slot="tree-view-branch-indicator"
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
      className={cn(
        'inline-flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap [&_svg]:size-4 [&_svg]:shrink-0',
        className,
      )}
      {...props}
      data-slot="tree-view-branch-text"
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
      className={cn(
        'relative flex min-w-0 flex-col gap-1 overflow-hidden data-[state=closed]:animate-[moduix-collapsible-content-closed_150ms_ease-out] data-[state=open]:animate-[moduix-collapsible-content-open_150ms_ease-out] motion-reduce:animate-none',
        className,
      )}
      {...props}
      data-slot="tree-view-branch-content"
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
      className={cn(
        'pointer-events-none absolute inset-y-0 start-[calc(1rem+((var(--depth,1)-1)*1rem))] z-1 w-px bg-border',
        className,
      )}
      {...props}
      data-slot="tree-view-branch-indent-guide"
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
      className={cn(
        "relative z-0 box-border flex min-h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-sm bg-transparent py-1 ps-[calc(1rem+((var(--depth,1)-1)*1rem))] pe-2 text-start text-foreground no-underline transition-[color,opacity] duration-200 ease-in-out outline-none select-none [font:inherit] before:pointer-events-none before:absolute before:inset-y-0 before:start-[calc(0.5rem+((var(--depth,1)-1)*1rem))] before:end-0 before:-z-1 before:rounded-sm before:bg-transparent before:ring-1 before:ring-transparent before:transition-[background-color,box-shadow] before:duration-200 before:ease-in-out before:content-[''] before:ring-inset focus-visible:before:ring-ring data-disabled:cursor-default data-disabled:text-muted-foreground data-disabled:opacity-50 data-focus:before:ring-ring data-selected:text-accent-foreground data-selected:before:bg-accent motion-reduce:before:transition-none [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-accent-foreground [@media(hover:hover)]:[&:not([data-disabled]):hover]:before:bg-accent",
        className,
      )}
      {...props}
      data-slot="tree-view-item"
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
      className={cn(
        'inline-flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap [&_svg]:size-4 [&_svg]:shrink-0',
        className,
      )}
      {...props}
      data-slot="tree-view-item-text"
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
      className={cn(
        'inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-3.5',
        className,
      )}
      {...props}
      data-slot="tree-view-item-indicator"
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
      className={cn(
        'inline-flex size-4 shrink-0 items-center justify-center rounded-xs border border-border bg-background text-primary-foreground outline-1 outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color] duration-200 ease-in-out focus-visible:outline-ring data-disabled:cursor-default data-disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary motion-reduce:transition-none [&_svg]:size-3',
        className,
      )}
      {...props}
      data-slot="tree-view-node-checkbox"
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
      className={cn('inline-flex items-center justify-center', className)}
      indeterminate={indeterminate ?? <IndeterminateIcon />}
      {...props}
      data-slot="tree-view-node-checkbox-indicator"
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
      className={cn(
        'box-border min-w-0 flex-1 rounded-xs border border-ring bg-background px-1 py-0 text-foreground outline-1 -outline-offset-1 outline-transparent [font:inherit] focus-visible:outline-ring',
        className,
      )}
      {...props}
      data-slot="tree-view-node-rename-input"
    />
  );
});

const TreeViewNodeProvider = TreeViewPrimitive.NodeProvider;

type TreeViewNodeRenderProps<T extends TreeNode> = {
  indexPath: number[];
  node: T;
  state: TreeViewNodeState;
};

type TreeViewNodeProps<T extends TreeNode> = {
  children: (props: TreeViewNodeRenderProps<T>) => ReactNode;
  indexPath: number[];
  node: T;
};

function TreeViewNodeContent<T extends TreeNode>({
  children,
  indexPath,
  node,
}: TreeViewNodeProps<T>) {
  return children({ indexPath, node, state: useTreeViewNodeContext() });
}

function TreeViewNode<T extends TreeNode>({ children, indexPath, node }: TreeViewNodeProps<T>) {
  return (
    <TreeViewNodeProvider node={node} indexPath={indexPath}>
      <TreeViewNodeContent node={node} indexPath={indexPath}>
        {children}
      </TreeViewNodeContent>
    </TreeViewNodeProvider>
  );
}

const TreeView = Object.assign(TreeViewRoot, {
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