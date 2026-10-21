import {
  RadioGroup as RadioGroupPrimitive,
  useRadioGroup,
  useRadioGroupContext,
  useRadioGroupItemContext,
} from '@ark-ui/solid/radio-group';
import type { ComponentProps, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
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
  children: JSX.Element;
};

function RadioGroup(props: RadioGroupRootProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <RadioGroupPrimitive.Root
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="radio-group-root"
      class={cn('group/radio-group flex flex-col gap-2 text-foreground', local.class)}
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
      class={cn('group/radio-group flex flex-col gap-2 text-foreground', local.class)}
    />
  );
}

function RadioGroupLabel(props: ComponentProps<typeof RadioGroupPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <RadioGroupPrimitive.Label
      {...others}
      data-slot="radio-group-label"
      class={cn('text-sm leading-5 font-semibold', local.class)}
    />
  );
}

function RadioGroupItem(props: ComponentProps<typeof RadioGroupPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <RadioGroupPrimitive.Item
      {...others}
      data-slot="radio-group-item"
      class={cn(
        'inline-flex w-fit cursor-pointer items-center gap-2 align-middle data-disabled:cursor-default data-disabled:opacity-50 data-readonly:cursor-default',
        local.class,
      )}
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
      class={cn(
        "inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary-foreground transition-[background-color,border-color] duration-normal ease-in-out select-none group-data-[size=lg]/radio-group:size-control-xs group-data-[size=sm]/radio-group:size-4 group-data-[size=xl]/radio-group:size-7 group-data-[size=xs]/radio-group:size-3.5 before:size-2 before:scale-[0.6] before:rounded-full before:bg-current before:opacity-0 before:transition-[opacity,transform] before:duration-normal before:ease-in-out before:content-[''] group-data-[size=lg]/radio-group:before:size-2.5 group-data-[size=sm]/radio-group:before:size-1.5 group-data-[size=xl]/radio-group:before:size-3 group-data-[size=xs]/radio-group:before:size-1 data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:border-destructive data-invalid:data-focus-visible:outline-destructive data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:before:scale-100 data-[state=checked]:before:opacity-100 data-invalid:data-[state=checked]:border-destructive [@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly])[data-state='unchecked'][data-hover]]:bg-accent",
        local.class,
      )}
    />
  );
}

function RadioGroupItemText(props: ComponentProps<typeof RadioGroupPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <RadioGroupPrimitive.ItemText
      {...others}
      data-slot="radio-group-item-text"
      class={cn('text-sm leading-5 font-medium', local.class)}
    />
  );
}

function RadioGroupIndicator(props: ComponentProps<typeof RadioGroupPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <RadioGroupPrimitive.Indicator
      {...others}
      data-slot="radio-group-indicator"
      class={cn(
        'pointer-events-none top-[var(--top)] left-[var(--left)] h-[var(--height)] w-[var(--width)] rounded-md bg-primary opacity-[0.12] [--transition-duration:var(--moduix-duration-normal)] [--transition-timing-function:var(--moduix-ease-in-out)]',
        local.class,
      )}
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