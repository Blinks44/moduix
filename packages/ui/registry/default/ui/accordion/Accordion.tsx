import type { ComponentProps, ComponentRef } from 'react';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { PlusIcon } from '@/lib/moduix/icons/ui';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './Accordion.module.css';

const Accordion = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Root>,
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

const AccordionItem = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Item>,
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

const AccordionHeader = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Header>,
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

const AccordionTrigger = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Trigger>,
  AccordionPrimitive.Trigger.Props
>(function AccordionTrigger({ className, render, ...props }, ref) {
  return (
    <AccordionPrimitive.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      render={render}
      className={render ? className : mergeClassName(className, styles.trigger)}
      {...props}
    />
  );
});

function AccordionTriggerIcon({
  className,
  children,
  'aria-hidden': ariaHidden = true,
  ...props
}: ComponentProps<'span'>) {
  return (
    <span
      data-slot="accordion-trigger-icon"
      aria-hidden={ariaHidden}
      className={clsx(styles.triggerIcon, className)}
      {...props}
    >
      {children ?? <PlusIcon />}
    </span>
  );
}

const AccordionPanel = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Panel>,
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