import {
  RadioGroup as RadioGroupPrimitive,
  useRadioGroup,
  useRadioGroupContext,
  useRadioGroupItemContext,
} from '@ark-ui/solid/radio-group';
import { cva } from 'class-variance-authority';
import type { ComponentProps, JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

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

function RadioGroup(props: ComponentProps<typeof RadioGroupPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <RadioGroupPrimitive.Root
      asChild={local.asChild}
      {...others}
      data-slot="radio-group-root"
      class={cn(
        'relative flex flex-col gap-2 text-foreground data-disabled:cursor-default',
        local.class,
      )}
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
      class={cn(
        'relative flex flex-col gap-2 text-foreground data-disabled:cursor-default',
        local.class,
      )}
    />
  );
}

function RadioGroupLabel(props: ComponentProps<typeof RadioGroupPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <RadioGroupPrimitive.Label
      {...others}
      data-slot="radio-group-label"
      class={cn('text-sm leading-5 font-semibold text-inherit', local.class)}
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
      class={cn(
        'inline-flex w-fit cursor-pointer items-center gap-2 align-middle data-disabled:cursor-default data-disabled:opacity-50 data-readonly:cursor-default',
        local.class,
      )}
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
      class={cn(radioGroupItemControlVariants({ size: local.size ?? 'md' }), local.class)}
    />
  );
}

function RadioGroupItemText(props: ComponentProps<typeof RadioGroupPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <RadioGroupPrimitive.ItemText
      {...others}
      data-slot="radio-group-item-text"
      class={cn('text-sm leading-5 font-medium text-inherit', local.class)}
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
        'pointer-events-none absolute top-[var(--top)] left-[var(--left)] h-[var(--height)] w-[var(--width)] rounded-full bg-primary opacity-[0.12] [--transition-duration:var(--moduix-duration-normal)]',
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
export type { RadioGroupItemControlProps, RadioGroupItemControlSize, RadioGroupOptionProps };