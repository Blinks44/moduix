'use client';

import {
  Accordion as AccordionPrimitive,
  useAccordion,
  useAccordionContext,
  useAccordionItemContext,
} from '@ark-ui/react/accordion';
import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { PlusIcon } from '@/lib/moduix/icons/ui';

const AccordionRoot = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Root>,
  ComponentProps<typeof AccordionPrimitive.Root>
>(function AccordionRoot({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Root
      ref={ref}
      data-slot="accordion-root"
      className={cn(
        'box-border flex w-full max-w-full min-w-0 flex-col text-foreground data-[orientation=horizontal]:h-80 data-[orientation=horizontal]:max-h-full data-[orientation=horizontal]:w-auto data-[orientation=horizontal]:flex-row',
        className,
      )}
      {...props}
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
      data-slot="accordion-root-provider"
      className={cn(
        'box-border flex w-full max-w-full min-w-0 flex-col text-foreground data-[orientation=horizontal]:h-80 data-[orientation=horizontal]:max-h-full data-[orientation=horizontal]:w-auto data-[orientation=horizontal]:flex-row',
        className,
      )}
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
      className={cn(
        "[overflow-anchor:none] data-[orientation=horizontal]:flex [&[data-orientation='horizontal']:not(:last-child)]:border-e [&[data-orientation='horizontal']:not(:last-child)]:border-border [&[data-orientation='vertical']:not(:last-child)]:border-b [&[data-orientation='vertical']:not(:last-child)]:border-border",
        className,
      )}
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
      className={cn(
        'm-0 flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-muted px-3 py-2 text-start [font-family:inherit] text-md [font-weight:inherit] text-inherit [font-style:inherit] outline-0 transition-colors duration-200 select-none focus-visible:relative focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 data-disabled:cursor-default data-disabled:opacity-50 data-[orientation=horizontal]:h-full data-[orientation=horizontal]:w-10 data-[orientation=horizontal]:justify-center data-[orientation=horizontal]:[writing-mode:sideways-lr] motion-reduce:transition-none [&:not([disabled]):not([data-disabled]):active]:bg-accent [&:not([disabled]):not([data-disabled]):hover]:bg-accent',
        className,
      )}
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
      className={cn(
        'inline-flex size-3 shrink-0 items-center justify-center transition-transform duration-200 data-[state=open]:scale-110 data-[state=open]:rotate-45 motion-reduce:transition-none [&_svg]:size-full',
        className,
      )}
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
      className={cn(
        "overflow-hidden text-md text-muted-foreground data-[state=closed]:data-[orientation=horizontal]:animate-moduix-accordion-closed-horizontal data-[state=closed]:data-[orientation=vertical]:animate-moduix-accordion-closed data-[state=open]:data-[orientation=horizontal]:animate-moduix-accordion-open-horizontal data-[state=open]:data-[orientation=vertical]:animate-moduix-accordion-open motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms] data-[orientation=horizontal]:[&>*]:w-64 [&[hidden]:not([hidden='until-found'])]:hidden",
        className,
      )}
      {...props}
    />
  );
});

const AccordionItemBody = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function AccordionItemBody({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="accordion"
        data-part="item-body"
        data-slot="accordion-item-body"
        className={cn('grid min-w-0 gap-3 p-3', className)}
        {...props}
      />
    );
  },
);

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