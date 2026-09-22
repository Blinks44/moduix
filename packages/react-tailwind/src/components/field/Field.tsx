'use client';

import { Field as FieldPrimitive, useField, useFieldContext } from '@ark-ui/react/field';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type FieldItemProps = ComponentProps<'div'> & ComponentProps<typeof FieldPrimitive.Item>;

const Field = forwardRef<
  ComponentRef<typeof FieldPrimitive.Root>,
  ComponentProps<typeof FieldPrimitive.Root>
>(function Field({ className, ...props }, ref) {
  return (
    <FieldPrimitive.Root
      ref={ref}
      className={cn(
        'flex w-full max-w-none flex-col items-start gap-1 text-foreground data-disabled:opacity-50',
        className,
      )}
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
      className={cn(
        'flex w-full max-w-none flex-col items-start gap-1 text-foreground data-disabled:opacity-50',
        className,
      )}
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

const FieldInput = forwardRef<
  ComponentRef<typeof FieldPrimitive.Input>,
  ComponentProps<typeof FieldPrimitive.Input>
>(function FieldInput({ className, ...props }, ref) {
  return (
    <FieldPrimitive.Input
      ref={ref}
      className={cn(
        'min-h-control-md w-full rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none data-disabled:pointer-events-none data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        className,
      )}
      {...props}
      data-slot="field-input"
    />
  );
});

const FieldTextarea = forwardRef<
  ComponentRef<typeof FieldPrimitive.Textarea>,
  ComponentProps<typeof FieldPrimitive.Textarea>
>(function FieldTextarea({ className, ...props }, ref) {
  return (
    <FieldPrimitive.Textarea
      ref={ref}
      className={cn(
        'min-h-20 w-full resize-y rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none data-disabled:pointer-events-none data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        className,
      )}
      {...props}
      data-slot="field-textarea"
    />
  );
});

const FieldSelect = forwardRef<
  ComponentRef<typeof FieldPrimitive.Select>,
  ComponentProps<typeof FieldPrimitive.Select>
>(function FieldSelect({ className, ...props }, ref) {
  return (
    <FieldPrimitive.Select
      ref={ref}
      className={cn(
        'min-h-control-md w-full rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out focus-visible:outline-ring disabled:pointer-events-none data-disabled:pointer-events-none data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        className,
      )}
      {...props}
      data-slot="field-select"
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
  FieldInput,
  FieldItem,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRootProvider,
  FieldSelect,
  FieldTextarea,
  useField,
  useFieldContext,
};