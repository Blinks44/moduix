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
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

const rootClass =
  'flex w-full max-w-full min-w-0 flex-col text-foreground data-[orientation=horizontal]:h-80 data-[orientation=horizontal]:max-h-full data-[orientation=horizontal]:w-auto data-[orientation=horizontal]:flex-row';

function Accordion(props: ComponentProps<typeof AccordionPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AccordionPrimitive.Root
      class={cn(rootClass, local.class)}
      {...others}
      data-slot="accordion-root"
    />
  );
}

function AccordionRootProvider(props: ComponentProps<typeof AccordionPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AccordionPrimitive.RootProvider
      class={cn(rootClass, local.class)}
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
        'flex w-full cursor-pointer items-center justify-between gap-4 bg-transparent px-3 py-2 text-start text-md outline-0 transition-colors duration-normal select-none focus-visible:relative focus-visible:z-1 focus-visible:outline-focus focus-visible:outline-offset-focus-inset focus-visible:outline-ring disabled:cursor-default disabled:opacity-disabled data-[orientation=horizontal]:h-full data-[orientation=horizontal]:w-10 data-[orientation=horizontal]:justify-center data-[orientation=horizontal]:[writing-mode:sideways-lr] [&:not(:disabled):active]:bg-muted [@media(hover:hover)]:[&:not(:disabled):hover]:bg-muted',
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
        'inline-flex size-3 shrink-0 items-center justify-center transition-transform duration-normal data-[state=open]:rotate-180 [&_svg]:size-full',
        local.class,
      )}
      {...others}
      data-slot="accordion-item-indicator"
    >
      {resolvedChildren() ?? <ChevronDownIcon />}
    </AccordionPrimitive.ItemIndicator>
  );
}

function AccordionItemContent(props: ComponentProps<typeof AccordionPrimitive.ItemContent>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <AccordionPrimitive.ItemContent
      class={cn(
        'overflow-hidden text-md text-muted-foreground data-[state=closed]:data-[orientation=horizontal]:animate-moduix-accordion-closed-horizontal data-[state=closed]:data-[orientation=vertical]:animate-moduix-accordion-closed data-[state=open]:data-[orientation=horizontal]:animate-moduix-accordion-open-horizontal data-[state=open]:data-[orientation=vertical]:animate-moduix-accordion-open motion-reduce:data-[state]:data-[orientation]:animate-none data-[orientation=horizontal]:[&>*]:w-64',
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
export type {
  AccordionContextProps,
  AccordionFocusChangeDetails,
  AccordionItemContentProps,
  AccordionItemContextProps,
  AccordionItemIndicatorProps,
  AccordionItemProps,
  AccordionItemTriggerProps,
  AccordionRootProps,
  AccordionRootProviderProps,
  AccordionValueChangeDetails,
  UseAccordionContext,
  UseAccordionItemContext,
  UseAccordionProps,
  UseAccordionReturn,
} from '@ark-ui/solid/accordion';