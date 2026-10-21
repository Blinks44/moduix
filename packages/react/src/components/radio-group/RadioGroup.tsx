'use client';

import {
  RadioGroup as RadioGroupPrimitive,
  useRadioGroup,
  useRadioGroupContext,
  useRadioGroupItemContext,
} from '@ark-ui/react/radio-group';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import styles from './RadioGroup.module.css';

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
        className={clsx(styles.root, className)}
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
      className={clsx(styles.root, className)}
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
      className={clsx(styles.label, className)}
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
      className={clsx(styles.item, className)}
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
      className={clsx(styles.itemControl, className)}
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
      className={clsx(styles.itemText, className)}
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
      className={clsx(styles.indicator, className)}
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