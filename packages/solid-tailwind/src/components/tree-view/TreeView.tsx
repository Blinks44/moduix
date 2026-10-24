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
import { cva } from 'class-variance-authority';
import type { Accessor, JSX } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, ChevronRightIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui';

const treeViewRootVariants = cva(
  'box-border flex w-80 max-w-full min-w-0 flex-col gap-2 text-foreground',
);

const treeViewRowVariants = cva(
  "relative z-0 box-border flex min-h-control-sm w-full min-w-0 cursor-pointer items-center gap-2 rounded-sm py-1 pe-2 text-start text-inherit no-underline transition-[color,opacity] duration-normal ease-in-out outline-none select-none [--_tree-view-indent:calc((var(--depth)-1)*var(--moduix-spacing-4))] [font:inherit] before:pointer-events-none before:absolute before:inset-y-0 before:start-[calc(var(--_tree-view-indent)+var(--moduix-spacing-1))] before:end-0 before:-z-1 before:rounded-sm before:ring-1 before:ring-transparent before:transition-[background-color,box-shadow] before:duration-normal before:ease-in-out before:content-[''] before:ring-inset focus-visible:before:ring-ring data-disabled:cursor-default data-disabled:opacity-50 data-focus:before:ring-ring data-selected:text-accent-foreground data-selected:before:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-accent-foreground [@media(hover:hover)]:[&:not([data-disabled]):hover]:before:bg-accent",
);

function TreeView<T extends TreeNode>(props: TreeViewRootProps<T>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.Root
      class={cn(treeViewRootVariants(), local.class)}
      {...others}
      data-slot="tree-view-root"
    />
  );
}

function TreeViewRootProvider<T extends TreeNode>(props: TreeViewRootProviderProps<T>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.RootProvider
      class={cn(treeViewRootVariants(), local.class)}
      {...others}
      data-slot="tree-view-root-provider"
    />
  );
}

function TreeViewLabel(props: TreeViewLabelProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.Label
      class={cn('text-sm font-medium select-none', local.class)}
      {...others}
      data-slot="tree-view-label"
    />
  );
}

function TreeViewTree(props: TreeViewTreeProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.Tree
      class={cn('flex min-w-0 flex-col gap-1 text-sm', local.class)}
      {...others}
      data-slot="tree-view-tree"
    />
  );
}

function TreeViewBranch(props: TreeViewBranchProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.Branch
      class={cn('flex min-w-0 flex-col gap-1', local.class)}
      {...others}
      data-slot="tree-view-branch"
    />
  );
}

function TreeViewBranchControl(props: TreeViewBranchControlProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.BranchControl
      class={cn(
        treeViewRowVariants(),
        'ps-[calc(var(--_tree-view-indent)+var(--moduix-spacing-2))]',
        local.class,
      )}
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
      class={cn(
        'inline-flex size-4 shrink-0 items-center justify-center transition-transform duration-normal ease-in-out data-[state=open]:rotate-90 [&_svg]:size-3.5',
        local.class,
      )}
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
      class={cn(
        'inline-flex size-4 shrink-0 items-center justify-center transition-transform duration-normal ease-in-out data-[state=open]:rotate-90 [&_svg]:size-3.5',
        local.class,
      )}
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
      class={cn(
        'min-w-0 flex-1 truncate [&_svg]:my-[calc((1lh-var(--moduix-spacing-4))/2)] [&_svg]:me-2 [&_svg]:inline-block [&_svg]:size-4 [&_svg]:align-top',
        local.class,
      )}
      {...others}
      data-slot="tree-view-branch-text"
    />
  );
}

function TreeViewBranchContent(props: TreeViewBranchContentProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.BranchContent
      class={cn(
        'relative flex min-w-0 flex-col gap-1 overflow-hidden data-[state=closed]:animate-moduix-collapsible-closed data-[state=open]:animate-moduix-collapsible-open motion-reduce:data-[state]:animate-none',
        local.class,
      )}
      {...others}
      data-slot="tree-view-branch-content"
    />
  );
}

function TreeViewBranchIndentGuide(props: TreeViewBranchIndentGuideProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.BranchIndentGuide
      class={cn(
        'pointer-events-none absolute inset-y-0 start-[calc(var(--depth)*var(--moduix-spacing-4))] z-1 w-px bg-border',
        local.class,
      )}
      {...others}
      data-slot="tree-view-branch-indent-guide"
    />
  );
}

function TreeViewItem(props: TreeViewItemProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.Item
      class={cn(
        treeViewRowVariants(),
        'ps-[calc(var(--_tree-view-indent)+var(--moduix-spacing-4))]',
        local.class,
      )}
      {...others}
      data-slot="tree-view-item"
    />
  );
}

function TreeViewItemText(props: TreeViewItemTextProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.ItemText
      class={cn(
        'min-w-0 flex-1 truncate [&_svg]:my-[calc((1lh-var(--moduix-spacing-4))/2)] [&_svg]:me-2 [&_svg]:inline-block [&_svg]:size-4 [&_svg]:align-top',
        local.class,
      )}
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
      class={cn(
        'inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-3.5',
        local.class,
      )}
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
      class={cn(
        'inline-flex size-4 shrink-0 items-center justify-center rounded-xs border border-border bg-background text-primary-foreground outline-1 outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color] duration-normal ease-in-out focus-visible:outline-ring data-disabled:cursor-default data-disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary [&_svg]:size-3 [:is([data-slot=tree-view-item],[data-slot=tree-view-branch-control])[data-disabled]_&]:opacity-100',
        local.class,
      )}
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
      class={cn('inline-flex items-center justify-center', local.class)}
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
      class={cn(
        'box-border min-w-0 flex-1 rounded-xs border border-ring bg-background px-1 py-0 text-foreground outline-1 -outline-offset-1 outline-transparent [font:inherit] focus-visible:outline-ring',
        local.class,
      )}
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