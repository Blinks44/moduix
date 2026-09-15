'use client';

import {
  Collapsible as CollapsiblePrimitive,
  useCollapsible,
  useCollapsibleContext,
} from '@ark-ui/react/collapsible';
import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

const CollapsibleRoot = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Root>,
  ComponentProps<typeof CollapsiblePrimitive.Root>
>(function CollapsibleRoot({ className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Root
      ref={ref}
      className={cn(
        'box-border flex w-full max-w-full min-w-0 flex-col text-foreground',
        className,
      )}
      {...props}
      data-slot="collapsible-root"
    />
  );
});

const CollapsibleRootProvider = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.RootProvider>,
  ComponentProps<typeof CollapsiblePrimitive.RootProvider>
>(function CollapsibleRootProvider({ className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.RootProvider
      ref={ref}
      className={cn(
        'box-border flex w-full max-w-full min-w-0 flex-col text-foreground',
        className,
      )}
      {...props}
      data-slot="collapsible-root-provider"
    />
  );
});

const CollapsibleTrigger = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Trigger>,
  ComponentProps<typeof CollapsiblePrimitive.Trigger>
>(function CollapsibleTrigger({ asChild, className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      asChild={asChild}
      className={cn(
        !asChild &&
          'box-border flex w-full cursor-pointer items-center justify-between gap-2 bg-transparent px-0 py-1 text-start text-sm outline-0 transition-colors duration-200 select-none focus-visible:relative focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none',
        className,
      )}
      {...props}
      data-slot="collapsible-trigger"
    />
  );
});

const CollapsibleIndicator = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Indicator>,
  ComponentProps<typeof CollapsiblePrimitive.Indicator>
>(function CollapsibleIndicator({ className, children, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Indicator
      ref={ref}
      className={cn(
        'inline-flex size-3 shrink-0 items-center justify-center transition-transform duration-200 data-disabled:opacity-50 data-[state=open]:rotate-180 motion-reduce:transition-none [&_svg]:size-full',
        className,
      )}
      {...props}
      data-slot="collapsible-indicator"
    >
      {children ?? <ChevronDownIcon />}
    </CollapsiblePrimitive.Indicator>
  );
});

const CollapsibleContent = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Content>,
  ComponentProps<typeof CollapsiblePrimitive.Content>
>(function CollapsibleContent({ className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Content
      ref={ref}
      className={cn(
        'box-border overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-moduix-collapsible-closed data-[has-collapsed-size]:data-[state=closed]:animate-moduix-collapsible-closed-partial data-[state=open]:animate-moduix-collapsible-open data-[has-collapsed-size]:data-[state=open]:animate-moduix-collapsible-open-partial motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
        className,
      )}
      {...props}
      data-slot="collapsible-content"
    />
  );
});

const CollapsibleBody = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function CollapsibleBody({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={cn('grid min-w-0 gap-2', className)}
        {...props}
        data-slot="collapsible-body"
      />
    );
  },
);

const Collapsible = Object.assign(CollapsibleRoot, {
  Root: CollapsibleRoot,
  RootProvider: CollapsibleRootProvider,
  Context: CollapsiblePrimitive.Context,
  Trigger: CollapsibleTrigger,
  Indicator: CollapsibleIndicator,
  Content: CollapsibleContent,
  Body: CollapsibleBody,
});

export { Collapsible, useCollapsible, useCollapsibleContext };