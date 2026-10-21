'use client';

import {
  RadioGroup as RadioGroupPrimitive,
  useRadioGroup,
  useRadioGroupContext,
  useRadioGroupItemContext,
} from '@ark-ui/react/radio-group';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type RadioGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type RadioGroupRootProps = ComponentProps<typeof RadioGroupPrimitive.Root> & {
  size?: RadioGroupSize;
};
type RadioGroupRootProviderProps = ComponentProps<typeof RadioGroupPrimitive.RootProvider> & {
  size?: RadioGroupSize;
};
type RadioGroupOptionProps = Omit<
  ComponentProps<typeof RadioGroupPrimitive.Item>,
  'asChild' | 'children'
> & {
  children: ReactNode;
};

const RadioGroup = forwardRef<ComponentRef<typeof RadioGroupPrimitive.Root>, RadioGroupRootProps>(
  function RadioGroup({ className, size = 'md', ...props }, ref) {
    return (
      <RadioGroupPrimitive.Root
        ref={ref}
        className={cn('group/radio-group flex flex-col gap-2 text-foreground', className)}
        {...props}
        data-size={size}
        data-slot="radio-group-root"
      />
    );
  },
);

const RadioGroupRootProvider = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.RootProvider>,
  RadioGroupRootProviderProps
>(function RadioGroupRootProvider({ className, size = 'md', ...props }, ref) {
  return (
    <RadioGroupPrimitive.RootProvider
      ref={ref}
      className={cn('group/radio-group flex flex-col gap-2 text-foreground', className)}
      {...props}
      data-size={size}
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
      className={cn('text-sm leading-5 font-semibold', className)}
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
>(function RadioGroupOption({ children, ...props }, ref) {
  return (
    <RadioGroupItem ref={ref} {...props}>
      <RadioGroupPrimitive.ItemHiddenInput />
      <RadioGroupItemControl />
      <RadioGroupItemText>{children}</RadioGroupItemText>
    </RadioGroupItem>
  );
});

const RadioGroupItemControl = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.ItemControl>,
  ComponentProps<typeof RadioGroupPrimitive.ItemControl>
>(function RadioGroupItemControl({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.ItemControl
      ref={ref}
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary-foreground transition-[background-color,border-color] duration-normal ease-in-out select-none group-data-[size=lg]/radio-group:size-control-xs group-data-[size=sm]/radio-group:size-4 group-data-[size=xl]/radio-group:size-7 group-data-[size=xs]/radio-group:size-3.5 before:size-2 before:scale-[0.6] before:rounded-full before:bg-current before:opacity-0 before:transition-[opacity,transform] before:duration-normal before:ease-in-out before:content-[''] group-data-[size=lg]/radio-group:before:size-2.5 group-data-[size=sm]/radio-group:before:size-1.5 group-data-[size=xl]/radio-group:before:size-3 group-data-[size=xs]/radio-group:before:size-1 data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:border-destructive data-invalid:data-focus-visible:outline-destructive data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:before:scale-100 data-[state=checked]:before:opacity-100 data-invalid:data-[state=checked]:border-destructive [@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly])[data-state='unchecked'][data-hover]]:bg-accent",
        className,
      )}
      {...props}
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
      className={cn('text-sm leading-5 font-medium', className)}
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
        'pointer-events-none top-[var(--top)] left-[var(--left)] h-[var(--height)] w-[var(--width)] rounded-md bg-primary opacity-[0.12] [--transition-duration:var(--moduix-duration-normal)] [--transition-timing-function:var(--moduix-ease-in-out)]',
        className,
      )}
      {...props}
      data-slot="radio-group-indicator"
    />
  );
});

const RadioGroupContext = RadioGroupPrimitive.Context;
const RadioGroupItemContext = RadioGroupPrimitive.ItemContext;
const RadioGroupItemHiddenInput = RadioGroupPrimitive.ItemHiddenInput;

export {
  RadioGroup,
  RadioGroupContext,
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupItemContext,
  RadioGroupItemControl,
  RadioGroupItemHiddenInput,
  RadioGroupItemText,
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupRootProvider,
  useRadioGroup,
  useRadioGroupContext,
  useRadioGroupItemContext,
};
export type {
  RadioGroupOptionProps,
  RadioGroupRootProps,
  RadioGroupRootProviderProps,
  RadioGroupSize,
};