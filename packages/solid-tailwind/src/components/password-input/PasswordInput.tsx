import {
  PasswordInput as PasswordInputPrimitive,
  usePasswordInput,
  usePasswordInputContext,
} from '@ark-ui/solid/password-input';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { EyeClosedIcon, EyeIcon } from '@/lib/moduix/icons/ui/Icons';

function PasswordInputRoot(props: ComponentProps<typeof PasswordInputPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PasswordInputPrimitive.Root
      class={cn(
        'flex w-full max-w-none flex-col gap-1 text-foreground data-disabled:opacity-50',
        local.class,
      )}
      {...others}
      data-slot="password-input-root"
    />
  );
}

function PasswordInputRootProvider(
  props: ComponentProps<typeof PasswordInputPrimitive.RootProvider>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PasswordInputPrimitive.RootProvider
      class={cn(
        'flex w-full max-w-none flex-col gap-1 text-foreground data-disabled:opacity-50',
        local.class,
      )}
      {...others}
      data-slot="password-input-root-provider"
    />
  );
}

function PasswordInputLabel(props: ComponentProps<typeof PasswordInputPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PasswordInputPrimitive.Label
      class={cn('inline-flex items-center gap-1 text-sm font-medium text-foreground', local.class)}
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
        'flex min-h-control-md w-full items-center rounded-md border border-border bg-background pr-2 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out focus-within:outline-ring data-invalid:border-destructive data-invalid:focus-within:outline-destructive data-readonly:bg-background data-readonly:text-foreground motion-reduce:transition-none',
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
  const [local, others] = splitProps(props, ['asChild', 'class', 'defaultValue']);

  return (
    <PasswordInputPrimitive.Input
      asChild={local.asChild}
      {...others}
      {...{ 'prop:defaultValue': local.defaultValue }}
      data-slot="password-input-input"
      class={cn(
        'min-h-0 min-w-0 flex-auto bg-transparent px-3 py-1 text-md text-foreground outline-0 transition-opacity duration-200 ease-in-out placeholder:text-muted-foreground disabled:pointer-events-none data-disabled:pointer-events-none motion-reduce:transition-none',
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
        'group/password-input-trigger inline-flex size-control-sm min-w-control-sm shrink-0 cursor-pointer items-center justify-center rounded-sm bg-transparent text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default data-disabled:cursor-default data-readonly:cursor-default motion-reduce:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-readonly]):hover]:text-foreground',
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
        "inline-flex items-center justify-center rounded-sm p-1 transition-[background-color,color] duration-200 ease-in-out group-hover/password-input-trigger:bg-muted group-focus-visible/password-input-trigger:bg-muted group-data-[disabled]/password-input-trigger:bg-transparent group-data-[readonly]/password-input-trigger:bg-transparent motion-reduce:transition-none [&>svg:not([class*='size-'])]:size-4",
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

const PasswordInput = Object.assign(PasswordInputRoot, {
  Root: PasswordInputRoot,
  RootProvider: PasswordInputRootProvider,
  Context: PasswordInputPrimitive.Context,
  Label: PasswordInputLabel,
  Control: PasswordInputControl,
  Field: PasswordInputField,
  Input: PasswordInputInput,
  VisibilityTrigger: PasswordInputVisibilityTrigger,
  Indicator: PasswordInputIndicator,
});

export { PasswordInput, usePasswordInput, usePasswordInputContext };