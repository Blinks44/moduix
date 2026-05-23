import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { clsx } from 'clsx';
import * as React from 'react';
import { PlusFilledIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Accordion.module.css';

const Accordion = React.forwardRef(function Accordion<Value = unknown>(
  { className, ...props }: AccordionProps<Value>,
  ref: React.ForwardedRef<React.ComponentRef<typeof AccordionPrimitive.Root>>,
) {
  return (
    <AccordionPrimitive.Root
      ref={ref}
      data-slot="accordion-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}) as <Value = unknown>(
  props: AccordionProps<Value> &
    React.RefAttributes<React.ComponentRef<typeof AccordionPrimitive.Root>>,
) => React.ReactElement | null;

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  AccordionPrimitive.Item.Props
>(function AccordionItem({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      className={mergeClassName(className, styles.item)}
      {...props}
    />
  );
});

function AccordionHeader({ className, ...props }: AccordionPrimitive.Header.Props) {
  return (
    <AccordionPrimitive.Header
      data-slot="accordion-header"
      className={mergeClassName(className, styles.header)}
      {...props}
    />
  );
}

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(function AccordionTrigger(
  { className, children, icon, withIcon = true, classNames, slotProps, ...props },
  ref,
) {
  const triggerClassNames = classNames ?? {};
  const triggerSlotProps = slotProps ?? {};
  const { header: headerClassName, icon: iconClassName } = triggerClassNames;
  const { header: headerProps, icon: iconProps } = triggerSlotProps;

  return (
    <AccordionHeader {...headerProps} className={headerClassName}>
      <AccordionPrimitive.Trigger
        ref={ref}
        data-slot="accordion-trigger"
        className={mergeClassName(className, styles.trigger)}
        {...props}
      >
        {children}
        {withIcon && (
          <AccordionTriggerIcon {...iconProps} className={iconClassName}>
            {icon}
          </AccordionTriggerIcon>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionHeader>
  );
});

const AccordionTriggerIcon = React.forwardRef<HTMLSpanElement, React.ComponentProps<'span'>>(
  function AccordionTriggerIcon(
    { className, children, 'aria-hidden': ariaHidden = true, ...props },
    ref,
  ) {
    return (
      <span
        ref={ref}
        data-slot="accordion-trigger-icon"
        aria-hidden={ariaHidden}
        className={clsx(styles.triggerIcon, className)}
        {...props}
      >
        {children ?? <PlusFilledIcon />}
      </span>
    );
  },
);

const AccordionPanel = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Panel>,
  AccordionPrimitive.Panel.Props
>(function AccordionPanel({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Panel
      ref={ref}
      data-slot="accordion-panel"
      className={mergeClassName(className, styles.panel)}
      {...props}
    />
  );
});

type AccordionProps<Value = unknown> = AccordionPrimitive.Root.Props<Value>;
type AccordionValue<Value = unknown> = AccordionPrimitive.Root.Value<Value>;
type AccordionItemProps = AccordionPrimitive.Item.Props;
type AccordionTriggerIconProps = React.ComponentProps<'span'>;
type AccordionPanelProps = AccordionPrimitive.Panel.Props;
type AccordionTriggerClassNames = {
  header?: AccordionPrimitive.Header.Props['className'];
  icon?: AccordionTriggerIconProps['className'];
};
type AccordionTriggerSlotProps = {
  header?: Omit<AccordionPrimitive.Header.Props, 'children' | 'className'>;
  icon?: Omit<AccordionTriggerIconProps, 'children' | 'className'>;
};
type AccordionTriggerProps = AccordionPrimitive.Trigger.Props & {
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
  classNames?: AccordionTriggerClassNames;
  /**
   * Props for internal slots rendered by the trigger.
   */
  slotProps?: AccordionTriggerSlotProps;
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionTriggerIcon, AccordionPanel };

export type {
  AccordionValue,
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionTriggerIconProps,
  AccordionPanelProps,
  AccordionTriggerClassNames,
  AccordionTriggerSlotProps,
};