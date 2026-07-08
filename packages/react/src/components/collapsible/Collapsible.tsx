import type { ComponentProps, ComponentRef } from 'react';
import { Collapsible as CollapsiblePrimitive } from '@ark-ui/react/collapsible';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Collapsible.module.css';

const CollapsibleRoot = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Root>,
  ComponentProps<typeof CollapsiblePrimitive.Root>
>(function CollapsibleRoot({ className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Root
      ref={ref}
      data-slot="collapsible-root"
      className={clsx(styles.root, normalizeClassName(className))}
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
      className={clsx(styles.root, normalizeClassName(className))}
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
      className={clsx(!asChild && styles.trigger, normalizeClassName(className))}
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
      className={clsx(styles.indicator, normalizeClassName(className))}
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
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
    />
  );
});

const Collapsible = Object.assign(CollapsibleRoot, {
  Root: CollapsibleRoot,
  RootProvider: CollapsibleRootProvider,
  Trigger: CollapsibleTrigger,
  Indicator: CollapsibleIndicator,
  Content: CollapsibleContent,
});

export { Collapsible };