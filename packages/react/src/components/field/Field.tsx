'use client';

import { Field as FieldPrimitive, useField, useFieldContext } from '@ark-ui/react/field';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import styles from './Field.module.css';

type FieldItemProps = ComponentProps<'div'> & ComponentProps<typeof FieldPrimitive.Item>;

const Field = forwardRef<
  ComponentRef<typeof FieldPrimitive.Root>,
  ComponentProps<typeof FieldPrimitive.Root>
>(function Field({ className, ...props }, ref) {
  return (
    <FieldPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
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
      className={clsx(styles.root, className)}
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
      <div ref={ref} className={clsx(styles.item, className)} {...props} data-slot="field-item">
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
      className={clsx(styles.label, className)}
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
      className={clsx(styles.helperText, className)}
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
      className={clsx(styles.errorText, className)}
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
      className={clsx(styles.requiredIndicator, className)}
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