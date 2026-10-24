'use client';

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
  type TreeViewNodeCheckboxIndicatorProps,
  type TreeViewNodeCheckboxProps,
  type TreeViewNodeContextProps,
  type TreeViewNodeProviderProps,
  type TreeViewNodeRenameInputProps,
  type TreeViewNodeState,
  type TreeViewRenameCompleteDetails,
  type TreeViewRenameStartDetails,
  type TreeViewRootComponent,
  type TreeViewRootProps,
  type TreeViewRootProviderComponent,
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
} from '@ark-ui/react/tree-view';
import { cva } from 'class-variance-authority';
import type { ComponentRef, ForwardedRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, ChevronRightIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui';

const treeViewRootVariants = cva(
  'box-border flex w-80 max-w-full min-w-0 flex-col gap-2 text-foreground',
);

const treeViewRowVariants = cva(
  "relative z-0 box-border flex min-h-control-sm w-full min-w-0 cursor-pointer items-center gap-2 rounded-sm py-1 pe-2 text-start text-inherit no-underline transition-[color,opacity] duration-normal ease-in-out outline-none select-none [--_tree-view-indent:calc((var(--depth)-1)*var(--moduix-spacing-4))] [font:inherit] before:pointer-events-none before:absolute before:inset-y-0 before:start-[calc(var(--_tree-view-indent)+var(--moduix-spacing-1))] before:end-0 before:-z-1 before:rounded-sm before:ring-1 before:ring-transparent before:transition-[background-color,box-shadow] before:duration-normal before:ease-in-out before:content-[''] before:ring-inset focus-visible:before:ring-ring data-disabled:cursor-default data-disabled:opacity-disabled data-focus:before:ring-ring data-selected:text-accent-foreground data-selected:before:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-accent-foreground [@media(hover:hover)]:[&:not([data-disabled]):hover]:before:bg-accent",
);

const TreeView = forwardRef(function TreeView<T extends TreeNode>(
  { className, ...props }: TreeViewRootProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <TreeViewPrimitive.Root
      ref={ref}
      className={cn(treeViewRootVariants(), className)}
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
      className={cn(treeViewRootVariants(), className)}
      {...props}
      data-slot="tree-view-root-provider"
    />
  );
}) as TreeViewRootProviderComponent;

const TreeViewLabel = forwardRef<ComponentRef<typeof TreeViewPrimitive.Label>, TreeViewLabelProps>(
  function TreeViewLabel({ className, ...props }, ref) {
    return (
      <TreeViewPrimitive.Label
        ref={ref}
        className={cn('text-sm font-medium select-none', className)}
        {...props}
        data-slot="tree-view-label"
      />
    );
  },
);

const TreeViewTree = forwardRef<ComponentRef<typeof TreeViewPrimitive.Tree>, TreeViewTreeProps>(
  function TreeViewTree({ className, ...props }, ref) {
    return (
      <TreeViewPrimitive.Tree
        ref={ref}
        className={cn('flex min-w-0 flex-col gap-1 text-sm', className)}
        {...props}
        data-slot="tree-view-tree"
      />
    );
  },
);

const TreeViewBranch = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.Branch>,
  TreeViewBranchProps
>(function TreeViewBranch({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.Branch
      ref={ref}
      className={cn('flex min-w-0 flex-col gap-1', className)}
      {...props}
      data-slot="tree-view-branch"
    />
  );
});

const TreeViewBranchControl = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.BranchControl>,
  TreeViewBranchControlProps
>(function TreeViewBranchControl({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.BranchControl
      ref={ref}
      className={cn(
        treeViewRowVariants(),
        'ps-[calc(var(--_tree-view-indent)+var(--moduix-spacing-2))]',
        className,
      )}
      {...props}
      data-slot="tree-view-branch-control"
    />
  );
});

const TreeViewBranchTrigger = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.BranchTrigger>,
  TreeViewBranchTriggerProps
>(function TreeViewBranchTrigger({ className, children, ...props }, ref) {
  return (
    <TreeViewPrimitive.BranchTrigger
      ref={ref}
      className={cn(
        'inline-flex size-4 shrink-0 items-center justify-center transition-transform duration-normal ease-in-out data-[state=open]:rotate-90 [&_svg]:size-3.5',
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
  TreeViewBranchIndicatorProps
>(function TreeViewBranchIndicator({ className, children, ...props }, ref) {
  return (
    <TreeViewPrimitive.BranchIndicator
      ref={ref}
      className={cn(
        'inline-flex size-4 shrink-0 items-center justify-center transition-transform duration-normal ease-in-out data-[state=open]:rotate-90 [&_svg]:size-3.5',
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
  TreeViewBranchTextProps
>(function TreeViewBranchText({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.BranchText
      ref={ref}
      className={cn(
        'min-w-0 flex-1 truncate [&_svg]:my-[calc((1lh-var(--moduix-spacing-4))/2)] [&_svg]:me-2 [&_svg]:inline-block [&_svg]:size-4 [&_svg]:align-top',
        className,
      )}
      {...props}
      data-slot="tree-view-branch-text"
    />
  );
});

const TreeViewBranchContent = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.BranchContent>,
  TreeViewBranchContentProps
>(function TreeViewBranchContent({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.BranchContent
      ref={ref}
      className={cn(
        'relative flex min-w-0 flex-col gap-1 overflow-hidden data-[state=closed]:animate-moduix-collapsible-closed data-[state=open]:animate-moduix-collapsible-open motion-reduce:data-[state]:animate-none',
        className,
      )}
      {...props}
      data-slot="tree-view-branch-content"
    />
  );
});

const TreeViewBranchIndentGuide = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.BranchIndentGuide>,
  TreeViewBranchIndentGuideProps
>(function TreeViewBranchIndentGuide({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.BranchIndentGuide
      ref={ref}
      className={cn(
        'pointer-events-none absolute inset-y-0 start-[calc(var(--depth)*var(--moduix-spacing-4))] z-1 w-px bg-border',
        className,
      )}
      {...props}
      data-slot="tree-view-branch-indent-guide"
    />
  );
});

const TreeViewItem = forwardRef<ComponentRef<typeof TreeViewPrimitive.Item>, TreeViewItemProps>(
  function TreeViewItem({ className, ...props }, ref) {
    return (
      <TreeViewPrimitive.Item
        ref={ref}
        className={cn(
          treeViewRowVariants(),
          'ps-[calc(var(--_tree-view-indent)+var(--moduix-spacing-4))]',
          className,
        )}
        {...props}
        data-slot="tree-view-item"
      />
    );
  },
);

const TreeViewItemText = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.ItemText>,
  TreeViewItemTextProps
>(function TreeViewItemText({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.ItemText
      ref={ref}
      className={cn(
        'min-w-0 flex-1 truncate [&_svg]:my-[calc((1lh-var(--moduix-spacing-4))/2)] [&_svg]:me-2 [&_svg]:inline-block [&_svg]:size-4 [&_svg]:align-top',
        className,
      )}
      {...props}
      data-slot="tree-view-item-text"
    />
  );
});

const TreeViewItemIndicator = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.ItemIndicator>,
  TreeViewItemIndicatorProps
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
  TreeViewNodeCheckboxProps
>(function TreeViewNodeCheckbox({ className, ...props }, ref) {
  return (
    <TreeViewPrimitive.NodeCheckbox
      ref={ref}
      className={cn(
        'inline-flex size-4 shrink-0 items-center justify-center rounded-xs border border-border bg-background text-primary-foreground outline-1 outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color] duration-normal ease-in-out focus-visible:outline-ring data-disabled:cursor-default data-disabled:opacity-disabled data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary [&_svg]:size-3 [:is([data-slot=tree-view-item],[data-slot=tree-view-branch-control])[data-disabled]_&]:opacity-100',
        className,
      )}
      {...props}
      data-slot="tree-view-node-checkbox"
    />
  );
});

const TreeViewNodeCheckboxIndicator = forwardRef<
  HTMLSpanElement,
  TreeViewNodeCheckboxIndicatorProps
>(function TreeViewNodeCheckboxIndicator(
  { className, children, indeterminate, fallback, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn('inline-flex items-center justify-center', className)}
      {...props}
      data-slot="tree-view-node-checkbox-indicator"
    >
      <TreeViewPrimitive.NodeCheckboxIndicator
        fallback={fallback}
        indeterminate={indeterminate ?? <IndeterminateIcon />}
      >
        {children ?? <CheckIcon />}
      </TreeViewPrimitive.NodeCheckboxIndicator>
    </span>
  );
});

const TreeViewNodeRenameInput = forwardRef<
  ComponentRef<typeof TreeViewPrimitive.NodeRenameInput>,
  TreeViewNodeRenameInputProps
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
const TreeViewContext = TreeViewPrimitive.Context;
const TreeViewNodeContext = TreeViewPrimitive.NodeContext;

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