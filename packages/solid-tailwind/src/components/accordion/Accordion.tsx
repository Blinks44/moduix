import {
  Accordion as AccordionPrimitive,
  useAccordion,
  useAccordionContext,
  useAccordionItemContext,
} from '@ark-ui/solid/accordion';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { PlusIcon } from '@/lib/moduix/icons/ui';

function Accordion(props: ComponentProps<typeof AccordionPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AccordionPrimitive.Root
      class={cn(
        'box-border flex w-full max-w-full min-w-0 flex-col text-foreground data-[orientation=horizontal]:h-80 data-[orientation=horizontal]:max-h-full data-[orientation=horizontal]:w-auto data-[orientation=horizontal]:flex-row',
        local.class,
      )}
      {...others}
      data-slot="accordion-root"
    />
  );
}

function AccordionRootProvider(props: ComponentProps<typeof AccordionPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AccordionPrimitive.RootProvider
      class={cn(
        'box-border flex w-full max-w-full min-w-0 flex-col text-foreground data-[orientation=horizontal]:h-80 data-[orientation=horizontal]:max-h-full data-[orientation=horizontal]:w-auto data-[orientation=horizontal]:flex-row',
        local.class,
      )}
      {...others}
      data-slot="accordion-root-provider"
    />
  );
}

function AccordionItem(props: ComponentProps<typeof AccordionPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AccordionPrimitive.Item
      class={cn(
        "[overflow-anchor:none] data-[orientation=horizontal]:flex [&[data-orientation='horizontal']:not(:last-child)]:border-e [&[data-orientation='horizontal']:not(:last-child)]:border-border [&[data-orientation='vertical']:not(:last-child)]:border-b [&[data-orientation='vertical']:not(:last-child)]:border-border",
        local.class,
      )}
      {...others}
      data-slot="accordion-item"
    />
  );
}

function AccordionItemTrigger(props: ComponentProps<typeof AccordionPrimitive.ItemTrigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AccordionPrimitive.ItemTrigger
      class={cn(
        'flex w-full cursor-pointer items-center justify-between gap-4 bg-muted px-3 py-2 text-start text-md outline-0 transition-colors duration-200 select-none focus-visible:relative focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring data-disabled:cursor-default data-disabled:opacity-50 data-[orientation=horizontal]:h-full data-[orientation=horizontal]:w-10 data-[orientation=horizontal]:justify-center data-[orientation=horizontal]:[writing-mode:sideways-lr] motion-reduce:transition-none [&:not([data-disabled]):active]:bg-accent [&:not([data-disabled]):hover]:bg-accent',
        local.class,
      )}
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
      class={cn(
        'inline-flex size-3 shrink-0 items-center justify-center transition-transform duration-200 data-[state=open]:scale-110 data-[state=open]:rotate-45 motion-reduce:transition-none [&_svg]:size-full',
        local.class,
      )}
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
      class={cn(
        "overflow-hidden text-md text-muted-foreground data-[state=closed]:data-[orientation=horizontal]:animate-moduix-accordion-closed-horizontal data-[state=closed]:data-[orientation=vertical]:animate-moduix-accordion-closed data-[state=open]:data-[orientation=horizontal]:animate-moduix-accordion-open-horizontal data-[state=open]:data-[orientation=vertical]:animate-moduix-accordion-open motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms] data-[orientation=horizontal]:[&>*]:w-64 [&[hidden]:not([hidden='until-found'])]:hidden",
        local.class,
      )}
      {...others}
      data-slot="accordion-item-content"
    />
  );
}

function AccordionItemBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={cn('grid min-w-0 gap-3 p-3', local.class)}
      {...others}
      data-scope="accordion"
      data-part="item-body"
      data-slot="accordion-item-body"
    />
  );
}

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