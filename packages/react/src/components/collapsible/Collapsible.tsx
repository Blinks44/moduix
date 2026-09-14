'use client';

import {
  Collapsible as CollapsiblePrimitive,
  useCollapsible,
  useCollapsibleContext,
} from '@ark-ui/react/collapsible';
import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import styles from './Collapsible.module.css';

const CollapsibleRoot = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Root>,
  ComponentProps<typeof CollapsiblePrimitive.Root>
>(function CollapsibleRoot({ className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Root
      ref={ref}
      data-slot="collapsible-root"
      className={clsx(styles.root, className)}
      {...props}
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
      data-slot="collapsible-root-provider"
      className={clsx(styles.root, className)}
      {...props}
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
      data-slot="collapsible-trigger"
      className={clsx(!asChild && styles.trigger, className)}
      {...props}
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
      data-slot="collapsible-indicator"
      className={clsx(styles.indicator, className)}
      {...props}
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
      data-slot="collapsible-content"
      className={clsx(styles.content, className)}
      {...props}
    />
  );
});

const CollapsibleBody = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function CollapsibleBody({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-slot="collapsible-body"
        className={clsx(styles.body, className)}
        {...props}
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