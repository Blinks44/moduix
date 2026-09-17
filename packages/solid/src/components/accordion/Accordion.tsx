import {
  Accordion as AccordionPrimitive,
  useAccordion,
  useAccordionContext,
  useAccordionItemContext,
} from '@ark-ui/solid/accordion';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { PlusIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Accordion.module.css';

function AccordionRoot(props: ComponentProps<typeof AccordionPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AccordionPrimitive.Root
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="accordion-root"
    />
  );
}

function AccordionRootProvider(props: ComponentProps<typeof AccordionPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AccordionPrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="accordion-root-provider"
    />
  );
}

function AccordionItem(props: ComponentProps<typeof AccordionPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AccordionPrimitive.Item
      class={clsx(styles.item, local.class)}
      {...others}
      data-slot="accordion-item"
    />
  );
}

function AccordionItemTrigger(props: ComponentProps<typeof AccordionPrimitive.ItemTrigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AccordionPrimitive.ItemTrigger
      class={clsx(styles.itemTrigger, local.class)}
      {...others}
      data-slot="accordion-item-trigger"
    />
  );
}

function AccordionItemIndicator(props: ComponentProps<typeof AccordionPrimitive.ItemIndicator>) {
  const [local, others] = splitProps(props, ['class', 'children']);
  const resolvedChildren = children(() => local.children);

  return (
    <AccordionPrimitive.ItemIndicator
      class={clsx(styles.itemIndicator, local.class)}
      {...others}
      data-slot="accordion-item-indicator"
    >
      {resolvedChildren() ?? <PlusIcon />}
    </AccordionPrimitive.ItemIndicator>
  );
}

function AccordionItemContent(props: ComponentProps<typeof AccordionPrimitive.ItemContent>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AccordionPrimitive.ItemContent
      class={clsx(styles.itemContent, local.class)}
      {...others}
      data-slot="accordion-item-content"
    />
  );
}

function AccordionItemBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={clsx(styles.itemBody, local.class)}
      {...others}
      data-scope="accordion"
      data-part="item-body"
      data-slot="accordion-item-body"
    />
  );
}

const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  RootProvider: AccordionRootProvider,
  Context: AccordionPrimitive.Context,
  ItemContext: AccordionPrimitive.ItemContext,
  Item: AccordionItem,
  ItemTrigger: AccordionItemTrigger,
  ItemIndicator: AccordionItemIndicator,
  ItemContent: AccordionItemContent,
  ItemBody: AccordionItemBody,
});

export { Accordion, useAccordion, useAccordionContext, useAccordionItemContext };