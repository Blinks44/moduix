import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { RadioGroup as RadioGroupPrimitive, useRadioGroup } from '@ark-ui/react/radio-group';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './RadioGroup.module.css';

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

const RadioGroupRoot = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Root>,
  ComponentProps<typeof RadioGroupPrimitive.Root>
>(function RadioGroupRoot({ className, ...props }, ref) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      data-slot="radio-group-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="radio-group-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="radio-group-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
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
      data-slot="radio-group-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
    />
  );
});

const RadioGroupOption = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupOptionProps
>(function RadioGroupOption({ children, size, ...props }, ref) {
  return (
    <RadioGroupItem ref={ref} {...props}>
      <RadioGroupItemControl size={size} />
      <RadioGroupItemText>{children}</RadioGroupItemText>
      <RadioGroupItemHiddenInput />
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
      data-slot="radio-group-item-control"
      data-size={size}
      className={clsx(styles.itemControl, normalizeClassName(className))}
      {...props}
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
      data-slot="radio-group-item-text"
      className={clsx(styles.itemText, normalizeClassName(className))}
      {...props}
    />
  );
});

const RadioGroupItemHiddenInput = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.ItemHiddenInput>,
  ComponentProps<typeof RadioGroupPrimitive.ItemHiddenInput>
>(function RadioGroupItemHiddenInput(props, ref) {
  return (
    <RadioGroupPrimitive.ItemHiddenInput
      ref={ref}
      data-slot="radio-group-item-hidden-input"
      {...props}
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
      data-slot="radio-group-indicator"
      className={clsx(styles.indicator, normalizeClassName(className))}
      {...props}
    />
  );
});

const RadioGroup = Object.assign(RadioGroupRoot, {
  Root: RadioGroupRoot,
  RootProvider: RadioGroupRootProvider,
  Label: RadioGroupLabel,
  Item: RadioGroupItem,
  Option: RadioGroupOption,
  ItemControl: RadioGroupItemControl,
  ItemText: RadioGroupItemText,
  ItemHiddenInput: RadioGroupItemHiddenInput,
  Indicator: RadioGroupIndicator,
});

export { RadioGroup, useRadioGroup };
export type { RadioGroupItemControlProps, RadioGroupItemControlSize, RadioGroupOptionProps };