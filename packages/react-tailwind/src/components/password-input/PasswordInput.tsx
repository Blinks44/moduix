import {
  PasswordInput as PasswordInputPrimitive,
  usePasswordInput,
  usePasswordInputContext,
} from '@ark-ui/react/password-input';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { EyeClosedIcon, EyeIcon } from '@/lib/moduix/icons/ui';

const PasswordInputRoot = forwardRef<
  ComponentRef<typeof PasswordInputPrimitive.Root>,
  ComponentProps<typeof PasswordInputPrimitive.Root>
>(function PasswordInputRoot({ className, ...props }, ref) {
  return (
    <PasswordInputPrimitive.Root
      ref={ref}
      data-slot="password-input-root"
      className={cn(
        'flex w-full max-w-none flex-col gap-1 text-foreground data-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
});

const PasswordInputRootProvider = forwardRef<
  ComponentRef<typeof PasswordInputPrimitive.RootProvider>,
  ComponentProps<typeof PasswordInputPrimitive.RootProvider>
>(function PasswordInputRootProvider({ className, ...props }, ref) {
  return (
    <PasswordInputPrimitive.RootProvider
      ref={ref}
      data-slot="password-input-root-provider"
      className={cn(
        'flex w-full max-w-none flex-col gap-1 text-foreground data-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
});

const PasswordInputLabel = forwardRef<
  ComponentRef<typeof PasswordInputPrimitive.Label>,
  ComponentProps<typeof PasswordInputPrimitive.Label>
>(function PasswordInputLabel({ className, ...props }, ref) {
  return (
    <PasswordInputPrimitive.Label
      ref={ref}
      data-slot="password-input-label"
      className={cn(
        'inline-flex items-center gap-1 text-sm leading-5 font-medium text-foreground',
        className,
      )}
      {...props}
    />
  );
});

const PasswordInputControl = forwardRef<
  ComponentRef<typeof PasswordInputPrimitive.Control>,
  ComponentProps<typeof PasswordInputPrimitive.Control>
>(function PasswordInputControl({ className, ...props }, ref) {
  return (
    <PasswordInputPrimitive.Control
      ref={ref}
      data-slot="password-input-control"
      className={cn(
        'flex min-h-control-md w-full items-center rounded-md border border-border bg-background pr-2 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out focus-within:outline-ring data-invalid:border-destructive data-invalid:focus-within:outline-destructive data-readonly:bg-background data-readonly:text-foreground motion-reduce:transition-none',
        className,
      )}
      {...props}
    />
  );
});

const PasswordInputInput = forwardRef<
  ComponentRef<typeof PasswordInputPrimitive.Input>,
  ComponentProps<typeof PasswordInputPrimitive.Input>
>(function PasswordInputInput({ className, ...props }, ref) {
  return (
    <PasswordInputPrimitive.Input
      ref={ref}
      data-slot="password-input-input"
      className={cn(
        'min-h-0 min-w-0 flex-auto bg-transparent px-3 py-1 text-md leading-6 text-foreground outline-0 transition-opacity duration-200 ease-in-out placeholder:text-muted-foreground disabled:pointer-events-none data-disabled:pointer-events-none motion-reduce:transition-none',
        className,
      )}
      {...props}
    />
  );
});

const PasswordInputVisibilityTrigger = forwardRef<
  ComponentRef<typeof PasswordInputPrimitive.VisibilityTrigger>,
  ComponentProps<typeof PasswordInputPrimitive.VisibilityTrigger>
>(function PasswordInputVisibilityTrigger({ className, ...props }, ref) {
  return (
    <PasswordInputPrimitive.VisibilityTrigger
      ref={ref}
      data-slot="password-input-visibility-trigger"
      className={cn(
        'group/password-input-trigger inline-flex size-control-sm min-w-control-sm shrink-0 cursor-pointer items-center justify-center rounded-sm bg-transparent text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring disabled:cursor-default data-disabled:cursor-default data-readonly:cursor-default motion-reduce:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-readonly]):hover]:text-foreground',
        className,
      )}
      {...props}
    />
  );
});

const PasswordInputIndicator = forwardRef<
  ComponentRef<typeof PasswordInputPrimitive.Indicator>,
  ComponentProps<typeof PasswordInputPrimitive.Indicator>
>(function PasswordInputIndicator({ className, children, fallback, ...props }, ref) {
  return (
    <PasswordInputPrimitive.Indicator
      ref={ref}
      data-slot="password-input-indicator"
      className={cn(
        "inline-flex items-center justify-center rounded-sm p-1 transition-[background-color,color] duration-200 ease-in-out group-hover/password-input-trigger:bg-muted group-focus-visible/password-input-trigger:bg-muted group-data-[disabled]/password-input-trigger:bg-transparent group-data-[readonly]/password-input-trigger:bg-transparent motion-reduce:transition-none [&>svg:not([class*='size-'])]:size-4",
        className,
      )}
      fallback={fallback ?? <EyeClosedIcon />}
      {...props}
    >
      {children ?? <EyeIcon />}
    </PasswordInputPrimitive.Indicator>
  );
});

type PasswordInputFieldProps = Omit<
  ComponentProps<typeof PasswordInputControl>,
  'asChild' | 'children'
>;

const PasswordInputField = forwardRef<
  ComponentRef<typeof PasswordInputPrimitive.Control>,
  PasswordInputFieldProps
>(function PasswordInputField(props, ref) {
  return (
    <PasswordInputControl ref={ref} {...props}>
      <PasswordInputInput />
      <PasswordInputVisibilityTrigger>
        <PasswordInputIndicator />
      </PasswordInputVisibilityTrigger>
    </PasswordInputControl>
  );
});

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