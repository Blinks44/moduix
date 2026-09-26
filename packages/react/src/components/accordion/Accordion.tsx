'use client';

import {
  Accordion as AccordionPrimitive,
  useAccordion,
  useAccordionContext,
  useAccordionItemContext,
} from '@ark-ui/react/accordion';
import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { PlusIcon } from '@/lib/moduix/icons/ui';
import styles from './Accordion.module.css';

const Accordion = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Root>,
  ComponentProps<typeof AccordionPrimitive.Root>
>(function Accordion({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="accordion-root"
    />
  );
});

const AccordionRootProvider = forwardRef<
  ComponentRef<typeof AccordionPrimitive.RootProvider>,
  ComponentProps<typeof AccordionPrimitive.RootProvider>
>(function AccordionRootProvider({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.RootProvider
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="accordion-root-provider"
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
      className={clsx(styles.item, className)}
      {...props}
      data-slot="accordion-item"
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
      className={clsx(styles.itemTrigger, className)}
      {...props}
      data-slot="accordion-item-trigger"
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
      className={clsx(styles.itemIndicator, className)}
      {...props}
      data-slot="accordion-item-indicator"
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
      className={clsx(styles.itemContent, className)}
      {...props}
      data-slot="accordion-item-content"
    />
  );
});

const AccordionItemBody = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function AccordionItemBody({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.itemBody, className)}
        {...props}
        data-scope="accordion"
        data-part="item-body"
        data-slot="accordion-item-body"
      />
    );
  },
);

const AccordionContext = AccordionPrimitive.Context;
const AccordionItemContext = AccordionPrimitive.ItemContext;

export {
  Accordion,
  AccordionContext,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemContext,
  AccordionItemIndicator,
  AccordionItemTrigger,
  AccordionRootProvider,
  useAccordion,
  useAccordionContext,
  useAccordionItemContext,
};