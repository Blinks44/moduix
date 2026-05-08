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

function AccordionTrigger({ className, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Trigger
      data-slot="accordion-trigger"
      className={mergeClassName(className, styles.trigger)}
      {...props}
    />
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
type AccordionTriggerProps = AccordionPrimitive.Trigger.Props;
type AccordionTriggerIconProps = React.ComponentProps<'span'>;
type AccordionPanelProps = AccordionPrimitive.Panel.Props;

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
};