import {
  Fieldset as FieldsetPrimitive,
  useFieldset,
  useFieldsetContext,
} from '@ark-ui/react/fieldset';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Fieldset.module.css';

const FieldsetRoot = forwardRef<
  ComponentRef<typeof FieldsetPrimitive.Root>,
  ComponentProps<typeof FieldsetPrimitive.Root>
>(function FieldsetRoot({ className, ...props }, ref) {
  return (
    <FieldsetPrimitive.Root
      ref={ref}
      data-slot="fieldset-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const FieldsetRootProvider = forwardRef<
  ComponentRef<typeof FieldsetPrimitive.RootProvider>,
  ComponentProps<typeof FieldsetPrimitive.RootProvider>
>(function FieldsetRootProvider({ className, ...props }, ref) {
  return (
    <FieldsetPrimitive.RootProvider
      ref={ref}
      data-slot="fieldset-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const FieldsetLegend = forwardRef<
  ComponentRef<typeof FieldsetPrimitive.Legend>,
  ComponentProps<typeof FieldsetPrimitive.Legend>
>(function FieldsetLegend({ className, ...props }, ref) {
  return (
    <FieldsetPrimitive.Legend
      ref={ref}
      data-slot="fieldset-legend"
      className={clsx(styles.legend, normalizeClassName(className))}
      {...props}
    />
  );
});

const FieldsetHelperText = forwardRef<
  ComponentRef<typeof FieldsetPrimitive.HelperText>,
  ComponentProps<typeof FieldsetPrimitive.HelperText>
>(function FieldsetHelperText({ className, ...props }, ref) {
  return (
    <FieldsetPrimitive.HelperText
      ref={ref}
      data-slot="fieldset-helper-text"
      className={clsx(styles.helperText, normalizeClassName(className))}
      {...props}
    />
  );
});

const FieldsetErrorText = forwardRef<
  ComponentRef<typeof FieldsetPrimitive.ErrorText>,
  ComponentProps<typeof FieldsetPrimitive.ErrorText>
>(function FieldsetErrorText({ className, ...props }, ref) {
  return (
    <FieldsetPrimitive.ErrorText
      ref={ref}
      data-slot="fieldset-error-text"
      className={clsx(styles.errorText, normalizeClassName(className))}
      {...props}
    />
  );
});

const Fieldset = Object.assign(FieldsetRoot, {
  Root: FieldsetRoot,
  RootProvider: FieldsetRootProvider,
  Context: FieldsetPrimitive.Context,
  Legend: FieldsetLegend,
  HelperText: FieldsetHelperText,
  ErrorText: FieldsetErrorText,
});

export { Fieldset, useFieldset, useFieldsetContext };