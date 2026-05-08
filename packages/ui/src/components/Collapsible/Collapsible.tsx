import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible';
import { clsx } from 'clsx';
import * as React from 'react';
import { ChevronRightIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Collapsible.module.css';

function Collapsible({ className, ...props }: CollapsiblePrimitive.Root.Props) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}

function CollapsibleTrigger({ className, ...props }: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={mergeClassName(className, styles.trigger)}
      {...props}
    />
  );
}

function CollapsibleTriggerIcon({ className, children, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="collapsible-trigger-icon"
      className={clsx(styles.triggerIcon, className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </span>
  );
}

function CollapsiblePanel({ className, ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-panel"
      className={mergeClassName(className, styles.panel)}
      {...props}
    />
  );
}

type CollapsibleProps = CollapsiblePrimitive.Root.Props;
type CollapsibleTriggerProps = CollapsiblePrimitive.Trigger.Props;
type CollapsibleTriggerIconProps = React.ComponentProps<'span'>;
type CollapsiblePanelProps = CollapsiblePrimitive.Panel.Props;

export { Collapsible, CollapsibleTrigger, CollapsibleTriggerIcon, CollapsiblePanel };

export type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleTriggerIconProps,
  CollapsiblePanelProps,
};