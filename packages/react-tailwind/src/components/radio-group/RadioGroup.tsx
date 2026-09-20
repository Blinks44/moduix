'use client';

import {
  RadioGroup as RadioGroupPrimitive,
  useRadioGroup,
  useRadioGroupContext,
  useRadioGroupItemContext,
} from '@ark-ui/react/radio-group';
import { cva } from 'class-variance-authority';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type RadioGroupItemControlSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type RadioGroupItemControlProps = ComponentProps<typeof RadioGroupPrimitive.ItemControl> & {
  size?: RadioGroupItemControlSize;
};
type RadioGroupOptionProps = Omit<
  ComponentProps<typeof RadioGroupPrimitive.Item>,
  'asChild' | 'children'
> & {
  children: ReactNode;
  size?: RadioGroupItemControlSize;
};

const radioGroupItemControlVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary-foreground outline-0 transition-[background-color,border-color,border-width,color,opacity] duration-200 ease-in-out select-none before:block before:rounded-full before:bg-current before:content-[''] before:scale-[0.6] before:opacity-0 before:transition-[opacity,transform] before:duration-200 before:ease-in-out data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:before:scale-100 data-[state=checked]:before:opacity-100 data-invalid:border-destructive data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:data-focus-visible:outline-destructive data-readonly:cursor-default data-disabled:cursor-default [@media(hover:hover)]:[&[data-state=unchecked]:not([data-readonly]):not([data-disabled]):hover]:bg-accent motion-reduce:transition-none motion-reduce:before:transition-none",
  {
    variants: {
      size: {
        xs: 'size-3.5 before:size-1',
        sm: 'size-4 before:size-1.5',
        md: 'size-5 before:size-2',
        lg: 'size-control-xs before:size-2.5',
        xl: 'size-7 before:size-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const RadioGroupRoot = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Root>,
  ComponentProps<typeof RadioGroupPrimitive.Root>
>(function RadioGroupRoot({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex flex-col gap-2 text-foreground data-disabled:cursor-default',
        className,
      )}
      {...props}
      data-slot="radio-group-root"
    />
  );
});

const RadioGroupRootProvider = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.RootProvider>,
  ComponentProps<typeof RadioGroupPrimitive.RootProvider>
>(function RadioGroupRootProvider({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.RootProvider
      ref={ref}
      className={cn(
        'relative flex flex-col gap-2 text-foreground data-disabled:cursor-default',
        className,
      )}
      {...props}
      data-slot="radio-group-root-provider"
    />
  );
});

const RadioGroupLabel = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Label>,
  ComponentProps<typeof RadioGroupPrimitive.Label>
>(function RadioGroupLabel({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Label
      ref={ref}
      className={cn('text-sm leading-5 font-semibold text-inherit', className)}
      {...props}
      data-slot="radio-group-label"
    />
  );
});

const RadioGroupItem = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Item>,
  ComponentProps<typeof RadioGroupPrimitive.Item>
>(function RadioGroupItem({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'inline-flex w-fit cursor-pointer items-center gap-2 align-middle data-disabled:cursor-default data-disabled:opacity-50 data-readonly:cursor-default',
        className,
      )}
      {...props}
      data-slot="radio-group-item"
    />
  );
});

const RadioGroupOption = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupOptionProps
>(function RadioGroupOption({ children, size, ...props }, ref) {
  return (
    <RadioGroupItem ref={ref} {...props}>
      <RadioGroupPrimitive.ItemHiddenInput />
      <RadioGroupItemControl size={size} />
      <RadioGroupItemText>{children}</RadioGroupItemText>
    </RadioGroupItem>
  );
});

const RadioGroupItemControl = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.ItemControl>,
  RadioGroupItemControlProps
>(function RadioGroupItemControl({ className, size = 'md', ...props }, ref) {
  return (
    <RadioGroupPrimitive.ItemControl
      ref={ref}
      className={cn(radioGroupItemControlVariants({ size }), className)}
      {...props}
      data-size={size}
      data-slot="radio-group-item-control"
    />
  );
});

const RadioGroupItemText = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.ItemText>,
  ComponentProps<typeof RadioGroupPrimitive.ItemText>
>(function RadioGroupItemText({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.ItemText
      ref={ref}
      className={cn('text-sm leading-5 font-medium text-inherit', className)}
      {...props}
      data-slot="radio-group-item-text"
    />
  );
});

const RadioGroupIndicator = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Indicator>,
  ComponentProps<typeof RadioGroupPrimitive.Indicator>
>(function RadioGroupIndicator({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Indicator
      ref={ref}
      className={cn(
        'pointer-events-none absolute top-[var(--top)] left-[var(--left)] h-[var(--height)] w-[var(--width)] rounded-full bg-primary opacity-[0.12] [--transition-duration:var(--moduix-duration-normal)]',
        className,
      )}
      {...props}
      data-slot="radio-group-indicator"
    />
  );
});

const RadioGroup = Object.assign(RadioGroupRoot, {
  Root: RadioGroupRoot,
  RootProvider: RadioGroupRootProvider,
  Context: RadioGroupPrimitive.Context,
  ItemContext: RadioGroupPrimitive.ItemContext,
  Label: RadioGroupLabel,
  Item: RadioGroupItem,
  ItemHiddenInput: RadioGroupPrimitive.ItemHiddenInput,
  Option: RadioGroupOption,
  ItemControl: RadioGroupItemControl,
  ItemText: RadioGroupItemText,
  Indicator: RadioGroupIndicator,
});

export { RadioGroup, useRadioGroup, useRadioGroupContext, useRadioGroupItemContext };
export type { RadioGroupItemControlProps, RadioGroupItemControlSize, RadioGroupOptionProps };