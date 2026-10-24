import { cva } from 'class-variance-authority';

export const treeViewRootVariants = cva(
  'box-border flex w-80 max-w-full min-w-0 flex-col gap-2 text-foreground',
);

export const treeViewRowVariants = cva(
  "relative z-0 box-border flex min-h-control-sm w-full min-w-0 cursor-pointer items-center gap-2 rounded-sm py-1 pe-2 text-start text-inherit no-underline transition-[color,opacity] duration-normal ease-in-out outline-none select-none [--_tree-view-indent:calc((var(--depth)-1)*var(--moduix-spacing-4))] [font:inherit] before:pointer-events-none before:absolute before:inset-y-0 before:start-[calc(var(--_tree-view-indent)+var(--moduix-spacing-1))] before:end-0 before:-z-1 before:rounded-sm before:ring-1 before:ring-transparent before:transition-[background-color,box-shadow] before:duration-normal before:ease-in-out before:content-[''] before:ring-inset focus-visible:before:ring-ring data-disabled:cursor-default data-disabled:opacity-50 data-focus:before:ring-ring data-selected:text-accent-foreground data-selected:before:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-accent-foreground [@media(hover:hover)]:[&:not([data-disabled]):hover]:before:bg-accent",
);