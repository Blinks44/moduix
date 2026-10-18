import {
  PasswordInput as PasswordInputPrimitive,
  usePasswordInput,
  usePasswordInputContext,
} from '@ark-ui/solid/password-input';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { EyeClosedIcon, EyeIcon } from '@/lib/moduix/icons/ui';

type PasswordInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type PasswordInputRootProps = ComponentProps<typeof PasswordInputPrimitive.Root> & {
  size?: PasswordInputSize;
};
type PasswordInputRootProviderProps = ComponentProps<typeof PasswordInputPrimitive.RootProvider> & {
  size?: PasswordInputSize;
};

const rootClass =
  'group/password-input flex w-full flex-col gap-1 text-foreground data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

function PasswordInput(props: PasswordInputRootProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <PasswordInputPrimitive.Root
      class={cn(rootClass, local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="password-input-root"
    />
  );
}

function PasswordInputRootProvider(props: PasswordInputRootProviderProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <PasswordInputPrimitive.RootProvider
      class={cn(rootClass, local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="password-input-root-provider"
    />
  );
}

function PasswordInputLabel(props: ComponentProps<typeof PasswordInputPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PasswordInputPrimitive.Label
      class={cn('inline-flex items-center gap-1 text-sm font-medium', local.class)}
      {...others}
      data-slot="password-input-label"
    />
  );
}

function PasswordInputControl(props: ComponentProps<typeof PasswordInputPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PasswordInputPrimitive.Control
      class={cn(
        'flex min-h-control-md items-center rounded-md border border-border bg-background pe-2 outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out group-data-[size=lg]/password-input:min-h-control-lg group-data-[size=lg]/password-input:pe-3 group-data-[size=sm]/password-input:min-h-control-sm group-data-[size=sm]/password-input:pe-1.5 group-data-[size=xl]/password-input:min-h-control-xl group-data-[size=xl]/password-input:pe-2.5 group-data-[size=xs]/password-input:min-h-control-xs focus-within:outline-ring data-invalid:border-destructive data-invalid:focus-within:outline-destructive',
        local.class,
      )}
      {...others}
      data-slot="password-input-control"
    />
  );
}

type PasswordInputInputProps = ComponentProps<typeof PasswordInputPrimitive.Input> & {
  defaultValue?: string | number | readonly string[];
};

function PasswordInputInput(props: PasswordInputInputProps) {
  const [local, others] = splitProps(props, ['class', 'defaultValue']);

  return (
    <PasswordInputPrimitive.Input
      {...others}
      {...{ 'prop:defaultValue': local.defaultValue }}
      data-slot="password-input-input"
      class={cn(
        'min-w-0 flex-auto bg-transparent px-3 py-1 text-md text-foreground outline-0 group-data-[size=lg]/password-input:px-4 group-data-[size=lg]/password-input:text-lg group-data-[size=sm]/password-input:px-2 group-data-[size=sm]/password-input:text-sm group-data-[size=xl]/password-input:px-4 group-data-[size=xl]/password-input:py-2 group-data-[size=xl]/password-input:text-lg group-data-[size=xs]/password-input:px-2 group-data-[size=xs]/password-input:py-0.5 group-data-[size=xs]/password-input:text-xs placeholder:text-muted-foreground',
        local.class,
      )}
    />
  );
}

function PasswordInputVisibilityTrigger(
  props: ComponentProps<typeof PasswordInputPrimitive.VisibilityTrigger>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PasswordInputPrimitive.VisibilityTrigger
      class={cn(
        'group/password-input-trigger inline-flex size-control-sm shrink-0 cursor-pointer items-center justify-center rounded-sm bg-transparent text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[color,outline-color] duration-normal ease-in-out group-data-[size=sm]/password-input:size-6 group-data-[size=xl]/password-input:size-10 group-data-[size=xs]/password-input:size-5 focus-visible:outline-ring data-disabled:cursor-default data-readonly:cursor-default [@media(hover:hover)]:[&:not([data-disabled],[data-readonly]):hover]:text-foreground',
        local.class,
      )}
      {...others}
      data-slot="password-input-visibility-trigger"
    />
  );
}

function PasswordInputIndicator(props: ComponentProps<typeof PasswordInputPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['children', 'class', 'fallback']);
  const resolvedChildren = children(() => local.children);

  return (
    <PasswordInputPrimitive.Indicator
      class={cn(
        "inline-flex items-center justify-center rounded-sm p-1 transition-[background-color] duration-normal ease-in-out group-hover/password-input-trigger:bg-muted group-focus-visible/password-input-trigger:bg-muted group-data-[disabled]/password-input-trigger:bg-transparent group-data-[readonly]/password-input-trigger:bg-transparent [&>svg:not([class*='size-'])]:size-4 group-data-[size=sm]/password-input:[&>svg:not([class*='size-'])]:size-3.5 group-data-[size=xl]/password-input:[&>svg:not([class*='size-'])]:size-5 group-data-[size=xs]/password-input:[&>svg:not([class*='size-'])]:size-3",
        local.class,
      )}
      fallback={local.fallback ?? <EyeClosedIcon />}
      {...others}
      data-slot="password-input-indicator"
    >
      {resolvedChildren() ?? <EyeIcon />}
    </PasswordInputPrimitive.Indicator>
  );
}

type PasswordInputFieldProps = Omit<
  ComponentProps<typeof PasswordInputControl>,
  'asChild' | 'children'
>;

function PasswordInputField(props: PasswordInputFieldProps) {
  return (
    <PasswordInputControl {...props}>
      <PasswordInputInput />
      <PasswordInputVisibilityTrigger>
        <PasswordInputIndicator />
      </PasswordInputVisibilityTrigger>
    </PasswordInputControl>
  );
}

const PasswordInputContext = PasswordInputPrimitive.Context;

export {
  PasswordInput,
  PasswordInputContext,
  PasswordInputControl,
  PasswordInputField,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputRootProvider,
  PasswordInputVisibilityTrigger,
  usePasswordInput,
  usePasswordInputContext,
};
export type {
  PasswordInputContextProps,
  PasswordInputControlProps,
  PasswordInputIndicatorProps,
  PasswordInputLabelProps,
  PasswordInputVisibilityChangeDetails,
  PasswordInputVisibilityTriggerProps,
  UsePasswordInputContext,
  UsePasswordInputProps,
  UsePasswordInputReturn,
} from '@ark-ui/solid/password-input';

export type {
  PasswordInputInputProps,
  PasswordInputRootProps,
  PasswordInputRootProviderProps,
  PasswordInputSize,
};