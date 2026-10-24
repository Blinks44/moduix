import {
  RadioGroup as RadioGroupPrimitive,
  useRadioGroup,
  useRadioGroupContext,
  useRadioGroupItemContext,
} from '@ark-ui/solid/radio-group';
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
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
  children: JSX.Element;
};

function RadioGroup(props: RadioGroupRootProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <RadioGroupPrimitive.Root
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="radio-group-root"
      class={clsx(styles.root, local.class)}
    />
  );
}

function RadioGroupRootProvider(props: RadioGroupRootProviderProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <RadioGroupPrimitive.RootProvider
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="radio-group-root-provider"
      class={clsx(styles.root, local.class)}
    />
  );
}

function RadioGroupLabel(props: ComponentProps<typeof RadioGroupPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <RadioGroupPrimitive.Label
      {...others}
      data-slot="radio-group-label"
      class={clsx(styles.label, local.class)}
    />
  );
}

function RadioGroupItem(props: ComponentProps<typeof RadioGroupPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <RadioGroupPrimitive.Item
      {...others}
      data-slot="radio-group-item"
      class={clsx(styles.item, local.class)}
    />
  );
}

function RadioGroupOption(props: RadioGroupOptionProps) {
  const [local, others] = splitProps(props, ['children']);

  return (
    <RadioGroupItem {...others}>
      <RadioGroupPrimitive.ItemHiddenInput />
      <RadioGroupItemControl />
      <RadioGroupItemText>{local.children}</RadioGroupItemText>
    </RadioGroupItem>
  );
}

function RadioGroupItemControl(props: ComponentProps<typeof RadioGroupPrimitive.ItemControl>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <RadioGroupPrimitive.ItemControl
      {...others}
      data-slot="radio-group-item-control"
      class={clsx(styles.itemControl, local.class)}
    />
  );
}

function RadioGroupItemText(props: ComponentProps<typeof RadioGroupPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <RadioGroupPrimitive.ItemText
      {...others}
      data-slot="radio-group-item-text"
      class={clsx(styles.itemText, local.class)}
    />
  );
}

function RadioGroupIndicator(props: ComponentProps<typeof RadioGroupPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <RadioGroupPrimitive.Indicator
      {...others}
      data-slot="radio-group-indicator"
      class={clsx(styles.indicator, local.class)}
    />
  );
}

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