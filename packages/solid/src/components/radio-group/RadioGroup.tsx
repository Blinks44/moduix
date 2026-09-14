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

type RadioGroupItemControlSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type RadioGroupItemControlProps = ComponentProps<typeof RadioGroupPrimitive.ItemControl> & {
  size?: RadioGroupItemControlSize;
};
type RadioGroupOptionProps = Omit<
  ComponentProps<typeof RadioGroupPrimitive.Item>,
  'asChild' | 'children'
> & {
  children: JSX.Element;
  size?: RadioGroupItemControlSize;
};

function RadioGroupRoot(props: ComponentProps<typeof RadioGroupPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <RadioGroupPrimitive.Root
      asChild={local.asChild}
      {...others}
      data-slot="radio-group-root"
      class={clsx(styles.root, local.class)}
    />
  );
}

function RadioGroupRootProvider(props: ComponentProps<typeof RadioGroupPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <RadioGroupPrimitive.RootProvider
      asChild={local.asChild}
      {...others}
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
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <RadioGroupPrimitive.Item
      asChild={local.asChild}
      {...others}
      data-slot="radio-group-item"
      class={clsx(styles.item, local.class)}
    >
      {local.children}
    </RadioGroupPrimitive.Item>
  );
}

function RadioGroupOption(props: RadioGroupOptionProps) {
  const [local, others] = splitProps(props, ['children', 'size']);

  return (
    <RadioGroupItem {...others}>
      <RadioGroupPrimitive.ItemHiddenInput />
      <RadioGroupItemControl size={local.size} />
      <RadioGroupItemText>{local.children}</RadioGroupItemText>
    </RadioGroupItem>
  );
}

function RadioGroupItemControl(props: RadioGroupItemControlProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <RadioGroupPrimitive.ItemControl
      {...others}
      data-slot="radio-group-item-control"
      data-size={local.size ?? 'md'}
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