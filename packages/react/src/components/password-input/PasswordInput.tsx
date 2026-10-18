'use client';

import {
  PasswordInput as PasswordInputPrimitive,
  usePasswordInput,
  usePasswordInputContext,
} from '@ark-ui/react/password-input';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { EyeClosedIcon, EyeIcon } from '@/lib/moduix/icons/ui';
import styles from './PasswordInput.module.css';

type PasswordInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type PasswordInputRootProps = ComponentProps<typeof PasswordInputPrimitive.Root> & {
  size?: PasswordInputSize;
};
type PasswordInputRootProviderProps = ComponentProps<typeof PasswordInputPrimitive.RootProvider> & {
  size?: PasswordInputSize;
};

const PasswordInput = forwardRef<
  ComponentRef<typeof PasswordInputPrimitive.Root>,
  PasswordInputRootProps
>(function PasswordInput({ className, size = 'md', ...props }, ref) {
  return (
    <PasswordInputPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
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
      className={clsx(styles.root, className)}
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
      className={clsx(styles.label, className)}
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
      className={clsx(styles.control, className)}
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
      className={clsx(styles.input, className)}
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
      className={clsx(styles.visibilityTrigger, className)}
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
      className={clsx(styles.indicator, className)}
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