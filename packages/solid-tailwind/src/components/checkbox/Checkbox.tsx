import {
  Checkbox as CheckboxPrimitive,
  useCheckbox,
  useCheckboxContext,
  useCheckboxGroup,
  useCheckboxGroupContext,
} from '@ark-ui/solid/checkbox';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui/Icons';

type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type CheckboxRootProps = ComponentProps<typeof CheckboxPrimitive.Root> & {
  size?: CheckboxSize;
};
type CheckboxRootProviderProps = ComponentProps<typeof CheckboxPrimitive.RootProvider> & {
  size?: CheckboxSize;
};

function Checkbox(props: CheckboxRootProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size']);

  return (
    <CheckboxPrimitive.Root
      asChild={local.asChild}
      class={cn(
        'group/checkbox inline-flex cursor-pointer items-center gap-2 align-middle text-foreground data-disabled:cursor-default data-disabled:opacity-50 data-readonly:cursor-default',
        local.class,
      )}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="checkbox-root"
    >
      {local.children}
    </CheckboxPrimitive.Root>
  );
}

function CheckboxRootProvider(props: CheckboxRootProviderProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size']);

  return (
    <CheckboxPrimitive.RootProvider
      asChild={local.asChild}
      class={cn(
        'group/checkbox inline-flex cursor-pointer items-center gap-2 align-middle text-foreground data-disabled:cursor-default data-disabled:opacity-50 data-readonly:cursor-default',
        local.class,
      )}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="checkbox-root-provider"
    >
      {local.children}
    </CheckboxPrimitive.RootProvider>
  );
}

function CheckboxIndicator(props: ComponentProps<typeof CheckboxPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['children', 'class', 'indeterminate']);
  const resolvedChildren = children(() => local.children);
  const slot = () =>
    local.indeterminate
      ? 'checkbox-indicator-indeterminate-icon'
      : 'checkbox-indicator-checked-icon';

  return (
    <CheckboxPrimitive.Indicator
      class={cn('inline-flex h-full w-full items-center justify-center text-inherit', local.class)}
      indeterminate={local.indeterminate}
      {...others}
      data-slot="checkbox-indicator"
    >
      {resolvedChildren() ?? (
        <span
          aria-hidden="true"
          data-slot={slot()}
          class="inline-flex size-3 items-center justify-center leading-none text-inherit group-data-[size=lg]/checkbox:size-3.5 group-data-[size=sm]/checkbox:size-2.5 group-data-[size=xl]/checkbox:size-4 group-data-[size=xs]/checkbox:size-2 [&>svg]:size-full"
        >
          {local.indeterminate ? <IndeterminateIcon /> : <CheckIcon />}
        </span>
      )}
    </CheckboxPrimitive.Indicator>
  );
}

function CheckboxControl(props: ComponentProps<typeof CheckboxPrimitive.Control>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <CheckboxPrimitive.Control
      class={cn(
        "[@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly])[data-state='unchecked'][data-hover]:bg-accent box-border inline-flex size-5 shrink-0 items-center justify-center rounded-xs border border-border bg-background p-0 leading-none text-primary-foreground transition-[background-color,border-color,color,opacity] duration-200 select-none group-data-[size=lg]/checkbox:size-control-xs group-data-[size=sm]/checkbox:size-4 group-data-[size=xl]/checkbox:size-7 group-data-[size=xs]/checkbox:size-3.5 data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:border-destructive data-invalid:text-destructive-foreground data-invalid:data-focus-visible:outline-destructive data-[state=checked]:border-primary data-[state=checked]:bg-primary data-invalid:data-[state=checked]:border-destructive data-invalid:data-[state=checked]:bg-destructive data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-invalid:data-[state=indeterminate]:border-destructive data-invalid:data-[state=indeterminate]:bg-destructive motion-reduce:transition-none",
        local.class,
      )}
      {...others}
      data-slot="checkbox-control"
    >
      {resolvedChildren() ?? (
        <>
          <CheckboxIndicator />
          <CheckboxIndicator indeterminate />
        </>
      )}
    </CheckboxPrimitive.Control>
  );
}

function CheckboxLabel(props: ComponentProps<typeof CheckboxPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CheckboxPrimitive.Label
      class={cn('text-sm leading-5 font-medium text-inherit', local.class)}
      {...others}
      data-slot="checkbox-label"
    />
  );
}

function CheckboxGroup(props: ComponentProps<typeof CheckboxPrimitive.Group>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <CheckboxPrimitive.Group
      class={cn('flex flex-col gap-2 text-foreground', local.class)}
      {...others}
      data-slot="checkbox-group"
    />
  );
}

const CheckboxContext = CheckboxPrimitive.Context;
const CheckboxHiddenInput = CheckboxPrimitive.HiddenInput;

export {
  Checkbox,
  CheckboxContext,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRootProvider,
  useCheckbox,
  useCheckboxContext,
  useCheckboxGroup,
  useCheckboxGroupContext,
};