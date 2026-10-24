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
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

const rootClass =
  'flex w-full max-w-full min-w-0 flex-col text-foreground data-[orientation=horizontal]:h-80 data-[orientation=horizontal]:max-h-full data-[orientation=horizontal]:w-auto data-[orientation=horizontal]:flex-row';

const Accordion = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Root>,
  ComponentProps<typeof AccordionPrimitive.Root>
>(function Accordion({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Root
      ref={ref}
      className={cn(rootClass, className)}
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
      className={cn(rootClass, className)}
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
      className={cn(
        "[overflow-anchor:none] data-[orientation=horizontal]:flex [&[data-orientation='horizontal']:not(:last-child)]:border-e [&[data-orientation='horizontal']:not(:last-child)]:border-border [&[data-orientation='vertical']:not(:last-child)]:border-b [&[data-orientation='vertical']:not(:last-child)]:border-border",
        className,
      )}
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
      className={cn(
        'flex w-full cursor-pointer items-center justify-between gap-4 bg-transparent px-3 py-2 text-start text-md outline-0 transition-colors duration-normal select-none focus-visible:relative focus-visible:z-1 focus-visible:outline-focus focus-visible:outline-offset-focus-inset focus-visible:outline-ring disabled:cursor-default disabled:opacity-disabled data-[orientation=horizontal]:h-full data-[orientation=horizontal]:w-10 data-[orientation=horizontal]:justify-center data-[orientation=horizontal]:[writing-mode:sideways-lr] [&:not(:disabled):active]:bg-muted [@media(hover:hover)]:[&:not(:disabled):hover]:bg-muted',
        className,
      )}
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
      className={cn(
        'inline-flex size-3 shrink-0 items-center justify-center transition-transform duration-normal data-[state=open]:rotate-180 [&_svg]:size-full',
        className,
      )}
      {...props}
      data-slot="accordion-item-indicator"
    >
      {children ?? <ChevronDownIcon />}
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
      className={cn(
        'overflow-hidden text-md text-muted-foreground data-[state=closed]:data-[orientation=horizontal]:animate-moduix-accordion-closed-horizontal data-[state=closed]:data-[orientation=vertical]:animate-moduix-accordion-closed data-[state=open]:data-[orientation=horizontal]:animate-moduix-accordion-open-horizontal data-[state=open]:data-[orientation=vertical]:animate-moduix-accordion-open motion-reduce:data-[state]:data-[orientation]:animate-none data-[orientation=horizontal]:[&>*]:w-64',
        className,
      )}
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
        className={cn('grid min-w-0 gap-3 p-3', className)}
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
} from '@ark-ui/react/accordion';