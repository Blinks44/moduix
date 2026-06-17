import type { ComponentProps, ComponentRef } from 'react';
import { Accordion as AccordionPrimitive } from '@ark-ui/react/accordion';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { PlusIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Accordion.module.css';

const AccordionRoot = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Root>,
  ComponentProps<typeof AccordionPrimitive.Root>
>(function AccordionRoot({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Root
      ref={ref}
      data-slot="accordion-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const AccordionItem = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Item>,
  ComponentProps<typeof AccordionPrimitive.Item>
>(function AccordionItem({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
    />
  );
});

const AccordionItemTrigger = forwardRef<
  ComponentRef<typeof AccordionPrimitive.ItemTrigger>,
  ComponentProps<typeof AccordionPrimitive.ItemTrigger>
>(function AccordionItemTrigger({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.ItemTrigger
      ref={ref}
      data-slot="accordion-item-trigger"
      className={clsx(styles.itemTrigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const AccordionItemIndicator = forwardRef<
  ComponentRef<typeof AccordionPrimitive.ItemIndicator>,
  ComponentProps<typeof AccordionPrimitive.ItemIndicator>
>(function AccordionItemIndicator({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.ItemIndicator
      ref={ref}
      data-slot="accordion-item-indicator"
      className={clsx(styles.itemIndicator, normalizeClassName(className))}
      {...props}
    >
      {children ?? <PlusIcon />}
    </AccordionPrimitive.ItemIndicator>
  );
});

const AccordionItemContent = forwardRef<
  ComponentRef<typeof AccordionPrimitive.ItemContent>,
  ComponentProps<typeof AccordionPrimitive.ItemContent>
>(function AccordionItemContent({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.ItemContent
      ref={ref}
      data-slot="accordion-item-content"
      className={clsx(styles.itemContent, normalizeClassName(className))}
      {...props}
    />
  );
});

const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  ItemTrigger: AccordionItemTrigger,
  ItemIndicator: AccordionItemIndicator,
  ItemContent: AccordionItemContent,
});

export {
  Accordion,
  AccordionRoot,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemIndicator,
  AccordionItemContent,
};