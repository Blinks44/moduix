'use client';

import {
  Fieldset as FieldsetPrimitive,
  useFieldset,
  useFieldsetContext,
} from '@ark-ui/react/fieldset';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import styles from './Fieldset.module.css';

const FieldsetRoot = forwardRef<
  ComponentRef<typeof FieldsetPrimitive.Root>,
  ComponentProps<typeof FieldsetPrimitive.Root>
>(function FieldsetRoot({ className, ...props }, ref) {
  return (
    <FieldsetPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="fieldset-root"
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
      className={clsx(styles.root, className)}
      {...props}
      data-slot="fieldset-root-provider"
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
      className={clsx(styles.legend, className)}
      {...props}
      data-slot="fieldset-legend"
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
      className={clsx(styles.helperText, className)}
      {...props}
      data-slot="fieldset-helper-text"
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
      className={clsx(styles.errorText, className)}
      {...props}
      data-slot="fieldset-error-text"
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