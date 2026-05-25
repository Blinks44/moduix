import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { clsx } from 'clsx';
import * as React from 'react';
import { PlusFilledIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Accordion.module.css';

const Accordion = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Root>,
  AccordionPrimitive.Root.Props
>(function Accordion({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Root
      ref={ref}
      data-slot="accordion-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
});

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

const AccordionHeader = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Header>,
  AccordionPrimitive.Header.Props
>(function AccordionHeader({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Header
      ref={ref}
      data-slot="accordion-header"
      className={mergeClassName(className, styles.header)}
      {...props}
    />
  );
});

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  AccordionPrimitive.Trigger.Props
>(function AccordionTrigger({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={mergeClassName(className, styles.trigger)}
      {...props}
    />
  );
});

function AccordionTriggerIcon({
  className,
  children,
  'aria-hidden': ariaHidden = true,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="accordion-trigger-icon"
      aria-hidden={ariaHidden}
      className={clsx(styles.triggerIcon, className)}
      {...props}
    >
      {children ?? <PlusFilledIcon />}
    </span>
  );
}

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

export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTriggerIcon,
  AccordionPanel,
};