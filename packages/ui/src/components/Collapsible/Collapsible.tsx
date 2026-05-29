import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible';
import { clsx } from 'clsx';
import { forwardRef, type ComponentProps, type ComponentRef } from 'react';
import { ChevronRightIcon } from '@/icons/ui';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Collapsible.module.css';

const Collapsible = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Root>,
  CollapsiblePrimitive.Root.Props
>(function Collapsible({ className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Root
      ref={ref}
      data-slot="collapsible-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
});

const CollapsibleTrigger = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Trigger>,
  CollapsiblePrimitive.Trigger.Props
>(function CollapsibleTrigger({ className, render, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      data-slot="collapsible-trigger"
      render={render}
      className={render ? className : mergeClassName(className, styles.trigger)}
      {...props}
    />
  );
});

function CollapsibleTriggerIcon({
  className,
  children,
  'aria-hidden': ariaHidden = true,
  ...props
}: ComponentProps<'span'>) {
  return (
    <span
      data-slot="collapsible-trigger-icon"
      aria-hidden={ariaHidden}
      className={clsx(styles.triggerIcon, className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </span>
  );
}

const CollapsiblePanel = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Panel>,
  CollapsiblePrimitive.Panel.Props
>(function CollapsiblePanel({ className, ...props }, ref) {
  return (
    <CollapsiblePrimitive.Panel
      ref={ref}
      data-slot="collapsible-panel"
      className={mergeClassName(className, styles.panel)}
      {...props}
    />
  );
});

export { Collapsible, CollapsibleTrigger, CollapsibleTriggerIcon, CollapsiblePanel };