import {
  PasswordInput as PasswordInputPrimitive,
  usePasswordInput,
  usePasswordInputContext,
} from '@ark-ui/react/password-input';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
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

const PasswordInput = forwardRef<
  ComponentRef<typeof PasswordInputPrimitive.Root>,
  PasswordInputRootProps
>(function PasswordInput({ className, size = 'md', ...props }, ref) {
  return (
    <PasswordInputPrimitive.Root
      ref={ref}
      className={cn(rootClass, className)}
      {...props}
      data-size={size}
      data-slot="password-input-root"
    />
  );
});

const PasswordInputRootProvider = forwardRef<
  ComponentRef<typeof PasswordInputPrimitive.RootProvider>,
  PasswordInputRootProviderProps
>(function PasswordInputRootProvider({ className, size = 'md', ...props }, ref) {
  return (
    <PasswordInputPrimitive.RootProvider
      ref={ref}
      className={cn(rootClass, className)}
      {...props}
      data-size={size}
      data-slot="password-input-root-provider"
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
      className={cn('inline-flex items-center gap-1 text-sm font-medium', className)}
      {...props}
      data-slot="password-input-label"
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
      className={cn(
        'flex min-h-control-md items-center rounded-md border border-border bg-background pe-2 outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out group-data-[size=lg]/password-input:min-h-control-lg group-data-[size=lg]/password-input:pe-3 group-data-[size=sm]/password-input:min-h-control-sm group-data-[size=sm]/password-input:pe-1.5 group-data-[size=xl]/password-input:min-h-control-xl group-data-[size=xl]/password-input:pe-2.5 group-data-[size=xs]/password-input:min-h-control-xs focus-within:outline-ring data-invalid:border-destructive data-invalid:focus-within:outline-destructive',
        className,
      )}
      {...props}
      data-slot="password-input-control"
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
      className={cn(
        'min-w-0 flex-auto bg-transparent px-3 py-1 text-md text-foreground outline-0 group-data-[size=lg]/password-input:px-4 group-data-[size=lg]/password-input:text-lg group-data-[size=sm]/password-input:px-2 group-data-[size=sm]/password-input:text-sm group-data-[size=xl]/password-input:px-4 group-data-[size=xl]/password-input:py-2 group-data-[size=xl]/password-input:text-lg group-data-[size=xs]/password-input:px-2 group-data-[size=xs]/password-input:py-0.5 group-data-[size=xs]/password-input:text-xs placeholder:text-muted-foreground',
        className,
      )}
      {...props}
      data-slot="password-input-input"
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
      className={cn(
        'group/password-input-trigger inline-flex size-control-sm shrink-0 cursor-pointer items-center justify-center rounded-sm bg-transparent text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[color,outline-color] duration-normal ease-in-out group-data-[size=sm]/password-input:size-6 group-data-[size=xl]/password-input:size-10 group-data-[size=xs]/password-input:size-5 focus-visible:outline-ring data-disabled:cursor-default data-readonly:cursor-default [@media(hover:hover)]:[&:not([data-disabled],[data-readonly]):hover]:text-foreground',
        className,
      )}
      {...props}
      data-slot="password-input-visibility-trigger"
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
      className={cn(
        "inline-flex items-center justify-center rounded-sm p-1 transition-[background-color] duration-normal ease-in-out group-hover/password-input-trigger:bg-muted group-focus-visible/password-input-trigger:bg-muted group-data-[disabled]/password-input-trigger:bg-transparent group-data-[readonly]/password-input-trigger:bg-transparent [&>svg:not([class*='size-'])]:size-4 group-data-[size=sm]/password-input:[&>svg:not([class*='size-'])]:size-3.5 group-data-[size=xl]/password-input:[&>svg:not([class*='size-'])]:size-5 group-data-[size=xs]/password-input:[&>svg:not([class*='size-'])]:size-3",
        className,
      )}
      fallback={fallback ?? <EyeClosedIcon />}
      {...props}
      data-slot="password-input-indicator"
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
  PasswordInputInputProps,
  PasswordInputLabelProps,
  PasswordInputVisibilityChangeDetails,
  PasswordInputVisibilityTriggerProps,
  UsePasswordInputContext,
  UsePasswordInputProps,
  UsePasswordInputReturn,
} from '@ark-ui/react/password-input';

export type { PasswordInputRootProps, PasswordInputRootProviderProps, PasswordInputSize };