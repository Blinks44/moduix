import { Collapsible as CollapsiblePrimitive } from '@base-ui/react/collapsible';
import { clsx } from 'clsx';
import * as React from 'react';
import { ChevronRightIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Collapsible.module.css';

type CollapsibleTriggerIconProps = React.ComponentProps<'span'>;

const Collapsible = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Root>,
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

const CollapsibleTrigger = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Trigger>,
  CollapsibleTriggerProps
>(function CollapsibleTrigger(
  { className, children, icon, withIcon = true, classNames, slotProps, ...props },
  ref,
) {
  const iconClassName = classNames?.icon;
  const iconProps = slotProps?.icon;

  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      data-slot="collapsible-trigger"
      className={mergeClassName(className, styles.trigger)}
      {...props}
    >
      {children}
      {withIcon && (
        <CollapsibleTriggerIcon {...iconProps} className={iconClassName}>
          {icon}
        </CollapsibleTriggerIcon>
      )}
    </CollapsiblePrimitive.Trigger>
  );
});

const CollapsibleTriggerIcon = React.forwardRef<HTMLSpanElement, CollapsibleTriggerIconProps>(
  function CollapsibleTriggerIcon(
    { className, children, 'aria-hidden': ariaHidden = true, ...props },
    ref,
  ) {
    return (
      <span
        ref={ref}
        data-slot="collapsible-trigger-icon"
        aria-hidden={ariaHidden}
        className={clsx(styles.triggerIcon, className)}
        {...props}
      >
        {children ?? <ChevronRightIcon />}
      </span>
    );
  },
);

const CollapsiblePanel = React.forwardRef<
  React.ComponentRef<typeof CollapsiblePrimitive.Panel>,
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
   * Icon rendered at the end of the trigger.
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