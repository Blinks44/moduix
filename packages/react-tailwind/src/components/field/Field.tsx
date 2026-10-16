'use client';

import { Field as FieldPrimitive, useField, useFieldContext } from '@ark-ui/react/field';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type FieldItemProps = ComponentProps<'div'> & ComponentProps<typeof FieldPrimitive.Item>;

const rootClass =
  'flex w-full flex-col items-start gap-1 text-foreground data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

const Field = forwardRef<
  ComponentRef<typeof FieldPrimitive.Root>,
  ComponentProps<typeof FieldPrimitive.Root>
>(function Field({ className, ...props }, ref) {
  return (
    <FieldPrimitive.Root
      ref={ref}
      className={cn(rootClass, className)}
      {...props}
      data-slot="field-root"
    />
  );
});

const FieldRootProvider = forwardRef<
  ComponentRef<typeof FieldPrimitive.RootProvider>,
  ComponentProps<typeof FieldPrimitive.RootProvider>
>(function FieldRootProvider({ className, ...props }, ref) {
  return (
    <FieldPrimitive.RootProvider
      ref={ref}
      className={cn(rootClass, className)}
      {...props}
      data-slot="field-root-provider"
    />
  );
});

const FieldItem = forwardRef<HTMLDivElement, FieldItemProps>(function FieldItem(
  { className, children, value, ...props },
  ref,
) {
  return (
    <FieldPrimitive.Item value={value}>
      <div ref={ref} className={cn('grid gap-1', className)} {...props} data-slot="field-item">
        {children}
      </div>
    </FieldPrimitive.Item>
  );
});

const FieldLabel = forwardRef<
  ComponentRef<typeof FieldPrimitive.Label>,
  ComponentProps<typeof FieldPrimitive.Label>
>(function FieldLabel({ className, ...props }, ref) {
  return (
    <FieldPrimitive.Label
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2 text-sm leading-5 font-medium wrap-anywhere text-foreground',
        className,
      )}
      {...props}
      data-slot="field-label"
    />
  );
});

const FieldHelperText = forwardRef<
  ComponentRef<typeof FieldPrimitive.HelperText>,
  ComponentProps<typeof FieldPrimitive.HelperText>
>(function FieldHelperText({ className, ...props }, ref) {
  return (
    <FieldPrimitive.HelperText
      ref={ref}
      className={cn('text-sm leading-5 wrap-anywhere text-muted-foreground', className)}
      {...props}
      data-slot="field-helper-text"
    />
  );
});

const FieldErrorText = forwardRef<
  ComponentRef<typeof FieldPrimitive.ErrorText>,
  ComponentProps<typeof FieldPrimitive.ErrorText>
>(function FieldErrorText({ className, ...props }, ref) {
  return (
    <FieldPrimitive.ErrorText
      ref={ref}
      className={cn('text-sm leading-5 font-medium wrap-anywhere text-destructive', className)}
      {...props}
      data-slot="field-error-text"
    />
  );
});

const FieldRequiredIndicator = forwardRef<
  ComponentRef<typeof FieldPrimitive.RequiredIndicator>,
  ComponentProps<typeof FieldPrimitive.RequiredIndicator>
>(function FieldRequiredIndicator({ className, ...props }, ref) {
  return (
    <FieldPrimitive.RequiredIndicator
      ref={ref}
      className={cn('text-destructive', className)}
      {...props}
      data-slot="field-required-indicator"
    />
  );
});

const FieldContext = FieldPrimitive.Context;

export {
  Field,
  FieldContext,
  FieldErrorText,
  FieldHelperText,
  FieldItem,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRootProvider,
  useField,
  useFieldContext,
};

export type {
  FieldContextProps,
  FieldErrorTextProps,
  FieldHelperTextProps,
  FieldLabelProps,
  FieldRequiredIndicatorProps,
  FieldRootProps,
  FieldRootProviderProps,
  UseFieldContext,
  UseFieldProps,
  UseFieldReturn,
} from '@ark-ui/react/field';