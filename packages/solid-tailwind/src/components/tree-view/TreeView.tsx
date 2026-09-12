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
import type { Accessor, ComponentProps, JSX } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, ChevronRightIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui/Icons';

const TreeViewRoot = function TreeViewRoot<T extends TreeNode>(props: TreeViewRootProps<T>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <TreeViewPrimitive.Root
      asChild={local.asChild}
      data-slot="tree-view-root"
      class={cn(
        'box-border flex w-80 max-w-full min-w-0 flex-col gap-2 text-foreground data-disabled:opacity-50',
        local.class,
      )}
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
      class={cn(
        'box-border flex w-80 max-w-full min-w-0 flex-col gap-2 text-foreground data-disabled:opacity-50',
        local.class,
      )}
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
      class={cn('text-sm leading-5 font-medium text-foreground select-none', local.class)}
      {...others}
    />
  );
}

function TreeViewTree(props: ComponentProps<typeof TreeViewPrimitive.Tree>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.Tree
      data-slot="tree-view-tree"
      class={cn('flex min-w-0 flex-col gap-1 text-sm leading-5 text-foreground', local.class)}
      {...others}
    />
  );
}

function TreeViewBranch(props: ComponentProps<typeof TreeViewPrimitive.Branch>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.Branch
      data-slot="tree-view-branch"
      class={cn('relative flex min-w-0 flex-col gap-1', local.class)}
      {...others}
    />
  );
}

function TreeViewBranchControl(props: ComponentProps<typeof TreeViewPrimitive.BranchControl>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.BranchControl
      data-slot="tree-view-branch-control"
      class={cn(
        "relative z-0 box-border flex min-h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-sm bg-transparent py-1 ps-[calc(0.5rem+((var(--depth,1)-1)*1rem))] pe-2 text-start text-foreground no-underline transition-[color,opacity] duration-200 ease-in-out outline-none select-none [font:inherit] before:pointer-events-none before:absolute before:inset-y-0 before:start-[calc(0.5rem+((var(--depth,1)-1)*1rem))] before:end-0 before:-z-1 before:rounded-sm before:bg-transparent before:ring-1 before:ring-transparent before:transition-[background-color,box-shadow] before:duration-200 before:ease-in-out before:content-[''] before:ring-inset focus-visible:before:ring-ring data-disabled:cursor-default data-disabled:text-muted-foreground data-disabled:opacity-50 data-focus:before:ring-ring data-selected:text-accent-foreground data-selected:before:bg-accent motion-reduce:before:transition-none [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-accent-foreground [@media(hover:hover)]:[&:not([data-disabled]):hover]:before:bg-accent",
        local.class,
      )}
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
      class={cn(
        'inline-flex size-4 shrink-0 items-center justify-center transition-transform duration-200 ease-in-out data-[state=open]:rotate-90 motion-reduce:transition-none [&_svg]:size-3.5',
        local.class,
      )}
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
      class={cn(
        'inline-flex size-4 shrink-0 items-center justify-center transition-transform duration-200 ease-in-out data-[state=open]:rotate-90 motion-reduce:transition-none [&_svg]:size-3.5',
        local.class,
      )}
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
      class={cn(
        'inline-flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap [&_svg]:size-4 [&_svg]:shrink-0',
        local.class,
      )}
      {...others}
    />
  );
}

function TreeViewBranchContent(props: ComponentProps<typeof TreeViewPrimitive.BranchContent>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.BranchContent
      data-slot="tree-view-branch-content"
      class={cn(
        'relative flex min-w-0 flex-col gap-1 overflow-hidden data-[state=closed]:animate-[moduix-collapsible-content-closed_150ms_ease-out] data-[state=open]:animate-[moduix-collapsible-content-open_150ms_ease-out] motion-reduce:animate-none',
        local.class,
      )}
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
      class={cn(
        'pointer-events-none absolute inset-y-0 start-[calc(1rem+((var(--depth,1)-1)*1rem))] z-1 w-px bg-border',
        local.class,
      )}
      {...others}
    />
  );
}

function TreeViewItem(props: ComponentProps<typeof TreeViewPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.Item
      data-slot="tree-view-item"
      class={cn(
        "relative z-0 box-border flex min-h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-sm bg-transparent py-1 ps-[calc(1rem+((var(--depth,1)-1)*1rem))] pe-2 text-start text-foreground no-underline transition-[color,opacity] duration-200 ease-in-out outline-none select-none [font:inherit] before:pointer-events-none before:absolute before:inset-y-0 before:start-[calc(0.5rem+((var(--depth,1)-1)*1rem))] before:end-0 before:-z-1 before:rounded-sm before:bg-transparent before:ring-1 before:ring-transparent before:transition-[background-color,box-shadow] before:duration-200 before:ease-in-out before:content-[''] before:ring-inset focus-visible:before:ring-ring data-disabled:cursor-default data-disabled:text-muted-foreground data-disabled:opacity-50 data-focus:before:ring-ring data-selected:text-accent-foreground data-selected:before:bg-accent motion-reduce:before:transition-none [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-accent-foreground [@media(hover:hover)]:[&:not([data-disabled]):hover]:before:bg-accent",
        local.class,
      )}
      {...others}
    />
  );
}

function TreeViewItemText(props: ComponentProps<typeof TreeViewPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TreeViewPrimitive.ItemText
      data-slot="tree-view-item-text"
      class={cn(
        'inline-flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap [&_svg]:size-4 [&_svg]:shrink-0',
        local.class,
      )}
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
      class={cn(
        'inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-3.5',
        local.class,
      )}
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
      class={cn(
        'inline-flex size-4 shrink-0 items-center justify-center rounded-xs border border-border bg-background text-primary-foreground outline-1 outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color] duration-200 ease-in-out focus-visible:outline-ring data-disabled:cursor-default data-disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary motion-reduce:transition-none [&_svg]:size-3',
        local.class,
      )}
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
      class={cn('inline-flex items-center justify-center', local.class)}
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
      class={cn(
        'box-border min-w-0 flex-1 rounded-xs border border-ring bg-background px-1 py-0 text-foreground outline-1 -outline-offset-1 outline-transparent [font:inherit] focus-visible:outline-ring',
        local.class,
      )}
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