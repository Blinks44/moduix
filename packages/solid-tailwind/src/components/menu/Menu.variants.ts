import { cva } from 'class-variance-authority';

export const menuPositionerVariants = cva(
  'z-[var(--z-index)] w-[var(--positioner-width,auto)] max-w-[var(--available-width)] outline-0',
);

export const menuContentVariants = cva(
  'relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] flex max-w-[min(20rem,var(--available-width,100vw))] min-w-[min(max(var(--reference-width,0px),12rem),var(--available-width,100vw))] origin-[var(--transform-origin)] flex-col overflow-visible rounded-md bg-popover py-1 text-popover-foreground shadow-lg outline-1 outline-border [--arrow-background:var(--color-popover)] [--arrow-size:0.625rem] data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
);