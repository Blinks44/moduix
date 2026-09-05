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

const rootClassName =
  'box-border flex w-[var(--moduix-accordion-width,100%)] max-w-[var(--moduix-accordion-max-width,100%)] min-w-0 flex-col text-[color:var(--moduix-accordion-color,var(--moduix-color-foreground))] data-[orientation=horizontal]:h-[var(--moduix-accordion-horizontal-height,20rem)] data-[orientation=horizontal]:max-h-[var(--moduix-accordion-horizontal-max-height,100%)] data-[orientation=horizontal]:w-[var(--moduix-accordion-horizontal-width,auto)] data-[orientation=horizontal]:flex-row';

const AccordionRoot = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Root>,
  ComponentProps<typeof AccordionPrimitive.Root>
>(function AccordionRoot({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Root
      ref={ref}
      data-slot="accordion-root"
      className={cn(rootClassName, className)}
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
      className={cn(rootClassName, className)}
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
        "[overflow-anchor:none] data-[orientation=horizontal]:flex [&[data-orientation='horizontal']:not(:last-child)]:border-e-[length:var(--moduix-accordion-item-border-width,var(--moduix-border-width-sm))] [&[data-orientation='horizontal']:not(:last-child)]:border-e-[var(--moduix-accordion-item-border-color,var(--moduix-color-border))] [&[data-orientation='vertical']:not(:last-child)]:border-b-[length:var(--moduix-accordion-item-border-width,var(--moduix-border-width-sm))] [&[data-orientation='vertical']:not(:last-child)]:border-b-[var(--moduix-accordion-item-border-color,var(--moduix-color-border))]",
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
        'm-0 flex w-full cursor-pointer items-center justify-between gap-[var(--moduix-accordion-trigger-gap,var(--moduix-spacing-4))] border-0 bg-[var(--moduix-accordion-trigger-bg,var(--moduix-color-muted))] px-[var(--moduix-accordion-trigger-padding-x,var(--moduix-spacing-3))] py-[var(--moduix-accordion-trigger-padding-y,var(--moduix-spacing-2))] text-start text-[length:var(--moduix-accordion-trigger-font-size,var(--moduix-text-md))] leading-[var(--moduix-accordion-trigger-line-height,var(--moduix-line-height-text-md))] text-inherit outline-0 select-none [font:inherit] [transition:background-color_var(--moduix-transition-default),color_var(--moduix-transition-default)] focus-visible:relative focus-visible:z-1 focus-visible:outline-[length:var(--moduix-accordion-focus-ring-width,var(--moduix-focus-ring-width,var(--moduix-border-width-md)))] focus-visible:outline-offset-[calc(var(--moduix-accordion-focus-ring-offset,var(--moduix-border-width-sm))*-1)] focus-visible:outline-[var(--moduix-accordion-focus-ring-color,var(--moduix-color-ring))] focus-visible:outline-solid disabled:cursor-default disabled:opacity-[var(--moduix-accordion-disabled-opacity,var(--moduix-opacity-disabled))] data-disabled:cursor-default data-disabled:opacity-[var(--moduix-accordion-disabled-opacity,var(--moduix-opacity-disabled))] data-[orientation=horizontal]:h-full data-[orientation=horizontal]:w-[var(--moduix-accordion-horizontal-trigger-width,2.5rem)] data-[orientation=horizontal]:justify-center data-[orientation=horizontal]:[writing-mode:sideways-lr] motion-reduce:transition-none [&:not([disabled]):not([data-disabled]):active]:bg-[var(--moduix-accordion-trigger-bg-active,var(--moduix-accordion-trigger-bg-hover,var(--moduix-color-accent)))] [&:not([disabled]):not([data-disabled]):hover]:bg-[var(--moduix-accordion-trigger-bg-hover,var(--moduix-color-accent))]',
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
        'inline-flex size-[var(--moduix-accordion-icon-size,var(--moduix-spacing-3))] shrink-0 items-center justify-center [transition:transform_var(--moduix-accordion-icon-transition,var(--moduix-transition-default))] data-[state=open]:transform-[var(--moduix-accordion-icon-open-transform,rotate(45deg)_scale(1.1))] motion-reduce:transition-none [&_svg]:size-full',
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
        "overflow-hidden text-[length:var(--moduix-accordion-item-content-font-size,var(--moduix-text-md))] leading-[var(--moduix-accordion-item-content-line-height,var(--moduix-line-height-text-md))] text-[var(--moduix-accordion-item-content-color,var(--moduix-color-muted-foreground))] data-[state=closed]:data-[orientation=horizontal]:animate-[moduix-accordion-item-content-closed-horizontal_var(--moduix-accordion-item-content-transition,var(--moduix-transition-default))] data-[state=closed]:data-[orientation=vertical]:animate-[moduix-accordion-item-content-closed_var(--moduix-accordion-item-content-transition,var(--moduix-transition-default))] data-[state=open]:data-[orientation=horizontal]:animate-[moduix-accordion-item-content-open-horizontal_var(--moduix-accordion-item-content-transition,var(--moduix-transition-default))] data-[state=open]:data-[orientation=vertical]:animate-[moduix-accordion-item-content-open_var(--moduix-accordion-item-content-transition,var(--moduix-transition-default))] motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms] data-[orientation=horizontal]:[&>*]:w-[var(--moduix-accordion-horizontal-content-width,16rem)] [&[hidden]:not([hidden='until-found'])]:hidden",
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
        className={cn(
          'grid min-w-0 gap-[var(--moduix-accordion-item-body-gap,var(--moduix-spacing-3))] p-[var(--moduix-accordion-item-body-padding,var(--moduix-spacing-3))]',
          className,
        )}
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