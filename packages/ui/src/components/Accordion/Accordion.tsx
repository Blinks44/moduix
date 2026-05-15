import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { clsx } from 'clsx';
import * as React from 'react';
import { PlusFilledIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Accordion.module.css';

function Accordion<Value = unknown>({ className, ...props }: AccordionProps<Value>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={mergeClassName(className, styles.item)}
      {...props}
    />
  );
}

function AccordionHeader({ className, ...props }: AccordionPrimitive.Header.Props) {
  return (
    <AccordionPrimitive.Header
      data-slot="accordion-header"
      className={mergeClassName(className, styles.header)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  icon,
  hideIcon = false,
  classNames,
  slotProps,
  ...props
}: AccordionTriggerProps) {
  const { header: headerClassName, icon: iconClassName } = classNames ?? {};
  const { header: headerProps, icon: iconProps } = slotProps ?? {};

  return (
    <AccordionHeader {...headerProps} className={headerClassName}>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={mergeClassName(className, styles.trigger)}
        {...props}
      >
        {children}
        {!hideIcon && (
          <AccordionTriggerIcon {...iconProps} className={iconClassName}>
            {icon}
          </AccordionTriggerIcon>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionHeader>
  );
}

function AccordionTriggerIcon({ className, children, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="accordion-trigger-icon"
      className={clsx(styles.triggerIcon, className)}
      {...props}
    >
      {children ?? <PlusFilledIcon />}
    </span>
  );
}

function AccordionPanel({ className, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className={mergeClassName(className, styles.panel)}
      {...props}
    />
  );
}

type AccordionProps<Value = unknown> = AccordionPrimitive.Root.Props<Value>;
type AccordionValue<Value = unknown> = AccordionPrimitive.Root.Value<Value>;
type AccordionItemProps = AccordionPrimitive.Item.Props;
type AccordionHeaderProps = AccordionPrimitive.Header.Props;
type AccordionTriggerIconProps = React.ComponentProps<'span'>;
type AccordionPanelProps = AccordionPrimitive.Panel.Props;
type AccordionTriggerClassNames = {
  header?: AccordionHeaderProps['className'];
  icon?: AccordionTriggerIconProps['className'];
};
type AccordionTriggerSlotProps = {
  header?: Omit<AccordionHeaderProps, 'children' | 'className'>;
  icon?: Omit<AccordionTriggerIconProps, 'children' | 'className'>;
};
type AccordionTriggerProps = AccordionPrimitive.Trigger.Props & {
  /**
   * Icon rendered at the end of the trigger. Pass `hideIcon` to remove it.
   */
  icon?: React.ReactNode;
  /**
   * Removes the default trigger icon.
   */
  hideIcon?: boolean;
  /**
   * Classes for internal slots rendered by the trigger.
   */
  classNames?: AccordionTriggerClassNames;
  /**
   * Props for internal slots rendered by the trigger.
   */
  slotProps?: AccordionTriggerSlotProps;
};

export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTriggerIcon,
  AccordionPanel,
};

export type {
  AccordionValue,
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionTriggerProps,
  AccordionTriggerIconProps,
  AccordionPanelProps,
  AccordionTriggerClassNames,
  AccordionTriggerSlotProps,
};