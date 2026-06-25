import type { ComponentProps, ComponentRef } from 'react';
import { Field as FieldPrimitive, useField, useFieldContext } from '@ark-ui/react/field';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Field.module.css';

type FieldItemProps = ComponentProps<'div'> & ComponentProps<typeof FieldPrimitive.Item>;

const FieldRoot = forwardRef<
  ComponentRef<typeof FieldPrimitive.Root>,
  ComponentProps<typeof FieldPrimitive.Root>
>(function FieldRoot({ className, ...props }, ref) {
  return (
    <FieldPrimitive.Root
      ref={ref}
      data-slot="field-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-slot="field-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

function FieldItem({ className, children, value, ...props }: FieldItemProps) {
  return (
    <FieldPrimitive.Item value={value}>
      <div
        data-slot="field-item"
        className={clsx(styles.item, normalizeClassName(className))}
        {...props}
      >
        {children}
      </div>
    </FieldPrimitive.Item>
  );
}

const FieldLabel = forwardRef<
  ComponentRef<typeof FieldPrimitive.Label>,
  ComponentProps<typeof FieldPrimitive.Label>
>(function FieldLabel({ className, ...props }, ref) {
  return (
    <FieldPrimitive.Label
      ref={ref}
      data-slot="field-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
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
      data-slot="field-input"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
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
      data-slot="field-textarea"
      className={clsx(styles.control, styles.textarea, normalizeClassName(className))}
      {...props}
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
      data-slot="field-select"
      className={clsx(styles.control, styles.select, normalizeClassName(className))}
      {...props}
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
      data-slot="field-helper-text"
      className={clsx(styles.helperText, normalizeClassName(className))}
      {...props}
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
      data-slot="field-error-text"
      className={clsx(styles.errorText, normalizeClassName(className))}
      {...props}
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
      data-slot="field-required-indicator"
      className={clsx(styles.requiredIndicator, normalizeClassName(className))}
      {...props}
    />
  );
});

const FieldContext = FieldPrimitive.Context;

const Field = Object.assign(FieldRoot, {
  Root: FieldRoot,
  RootProvider: FieldRootProvider,
  Item: FieldItem,
  Label: FieldLabel,
  Input: FieldInput,
  Textarea: FieldTextarea,
  Select: FieldSelect,
  HelperText: FieldHelperText,
  ErrorText: FieldErrorText,
  RequiredIndicator: FieldRequiredIndicator,
  Context: FieldContext,
});

export { Field, useField, useFieldContext };
export type {
  FieldContextProps,
  FieldErrorTextBaseProps,
  FieldErrorTextProps,
  FieldHelperTextBaseProps,
  FieldHelperTextProps,
  FieldInputBaseProps,
  FieldInputProps,
  FieldItemBaseProps,
  FieldLabelBaseProps,
  FieldLabelProps,
  FieldRequiredIndicatorBaseProps,
  FieldRequiredIndicatorProps,
  FieldRootBaseProps,
  FieldRootProps,
  FieldRootProviderBaseProps,
  FieldRootProviderProps,
  FieldSelectBaseProps,
  FieldSelectProps,
  FieldTextareaBaseProps,
  FieldTextareaProps,
  UseFieldContext,
  UseFieldProps,
  UseFieldReturn,
} from '@ark-ui/react/field';
export type { FieldItemProps };