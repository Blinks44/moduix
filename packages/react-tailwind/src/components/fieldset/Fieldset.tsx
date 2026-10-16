'use client';

import {
  Fieldset as FieldsetPrimitive,
  useFieldset,
  useFieldsetContext,
} from '@ark-ui/react/fieldset';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const rootClass = 'flex w-full min-w-0 flex-col gap-4 data-disabled:opacity-50';

const Fieldset = forwardRef<
  ComponentRef<typeof FieldsetPrimitive.Root>,
  ComponentProps<typeof FieldsetPrimitive.Root>
>(function Fieldset({ className, ...props }, ref) {
  return (
    <FieldsetPrimitive.Root
      {...props}
      ref={ref}
      data-slot="fieldset-root"
      className={cn(rootClass, className)}
    />
  );
});

const FieldsetRootProvider = forwardRef<
  ComponentRef<typeof FieldsetPrimitive.RootProvider>,
  ComponentProps<typeof FieldsetPrimitive.RootProvider>
>(function FieldsetRootProvider({ className, ...props }, ref) {
  return (
    <FieldsetPrimitive.RootProvider
      {...props}
      ref={ref}
      data-slot="fieldset-root-provider"
      className={cn(rootClass, className)}
    />
  );
});

const FieldsetLegend = forwardRef<
  ComponentRef<typeof FieldsetPrimitive.Legend>,
  ComponentProps<typeof FieldsetPrimitive.Legend>
>(function FieldsetLegend({ className, ...props }, ref) {
  return (
    <FieldsetPrimitive.Legend
      {...props}
      ref={ref}
      data-slot="fieldset-legend"
      className={cn(
        'max-w-full pb-3 text-lg font-semibold wrap-anywhere text-foreground',
        className,
      )}
    />
  );
});

const FieldsetHelperText = forwardRef<
  ComponentRef<typeof FieldsetPrimitive.HelperText>,
  ComponentProps<typeof FieldsetPrimitive.HelperText>
>(function FieldsetHelperText({ className, ...props }, ref) {
  return (
    <FieldsetPrimitive.HelperText
      {...props}
      ref={ref}
      data-slot="fieldset-helper-text"
      className={cn('text-sm wrap-anywhere text-muted-foreground', className)}
    />
  );
});

const FieldsetErrorText = forwardRef<
  ComponentRef<typeof FieldsetPrimitive.ErrorText>,
  ComponentProps<typeof FieldsetPrimitive.ErrorText>
>(function FieldsetErrorText({ className, ...props }, ref) {
  return (
    <FieldsetPrimitive.ErrorText
      {...props}
      ref={ref}
      data-slot="fieldset-error-text"
      className={cn('text-sm font-medium wrap-anywhere text-destructive', className)}
    />
  );
});

const FieldsetContext = FieldsetPrimitive.Context;

export {
  Fieldset,
  FieldsetContext,
  FieldsetErrorText,
  FieldsetHelperText,
  FieldsetLegend,
  FieldsetRootProvider,
  useFieldset,
  useFieldsetContext,
};

export type {
  FieldsetContextProps,
  FieldsetErrorTextProps,
  FieldsetHelperTextProps,
  FieldsetLegendProps,
  FieldsetRootProps,
  FieldsetRootProviderProps,
  UseFieldsetContext,
  UseFieldsetProps,
  UseFieldsetReturn,
} from '@ark-ui/react/fieldset';