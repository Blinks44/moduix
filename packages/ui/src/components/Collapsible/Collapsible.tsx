import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible';
import { clsx } from 'clsx';
import * as React from 'react';
import { ChevronRightIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Collapsible.module.css';

type CollapsibleTriggerIconProps = React.ComponentProps<'span'>;

function Collapsible({ className, ...props }: CollapsiblePrimitive.Root.Props) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}

function CollapsibleTrigger({
  className,
  children,
  icon,
  withIcon = true,
  classNames,
  slotProps,
  ...props
}: CollapsibleTriggerProps) {
  const iconClassName = classNames?.icon;
  const iconProps = slotProps?.icon;

  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={mergeClassName(className, styles.trigger)}
      {...props}
    >
      {withIcon && (
        <CollapsibleTriggerIcon {...iconProps} className={iconClassName}>
          {icon}
        </CollapsibleTriggerIcon>
      )}
      {children}
    </CollapsiblePrimitive.Trigger>
  );
}

function CollapsibleTriggerIcon({ className, children, ...props }: CollapsibleTriggerIconProps) {
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
type CollapsiblePanelProps = CollapsiblePrimitive.Panel.Props;
type CollapsibleTriggerClassNames = {
  icon?: CollapsibleTriggerIconProps['className'];
};
type CollapsibleTriggerSlotProps = {
  icon?: Omit<CollapsibleTriggerIconProps, 'children' | 'className'>;
};
type CollapsibleTriggerProps = CollapsiblePrimitive.Trigger.Props & {
  /**
   * Icon rendered at the start of the trigger.
   */
  icon?: React.ReactNode;
  /**
   * Toggles trigger icon rendering.
   */
  withIcon?: boolean;
  /**
   * Classes for internal slots rendered by the trigger.
   */
  classNames?: CollapsibleTriggerClassNames;
  /**
   * Props for internal slots rendered by the trigger.
   */
  slotProps?: CollapsibleTriggerSlotProps;
};

export { Collapsible, CollapsibleTrigger, CollapsibleTriggerIcon, CollapsiblePanel };

export type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleTriggerIconProps,
  CollapsiblePanelProps,
  CollapsibleTriggerClassNames,
  CollapsibleTriggerSlotProps,
};