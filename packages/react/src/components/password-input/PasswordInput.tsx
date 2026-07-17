import {
  PasswordInput as PasswordInputPrimitive,
  usePasswordInput,
} from '@ark-ui/react/password-input';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { EyeClosedIcon, EyeIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './PasswordInput.module.css';

const PasswordInputRoot = forwardRef<
  ComponentRef<typeof PasswordInputPrimitive.Root>,
  ComponentProps<typeof PasswordInputPrimitive.Root>
>(function PasswordInputRoot({ className, ...props }, ref) {
  return (
    <PasswordInputPrimitive.Root
      ref={ref}
      data-slot="password-input-root"
      className={clsx(styles.root, normalizeClassName(className))}
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
      className={clsx(styles.root, normalizeClassName(className))}
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
      className={clsx(styles.label, normalizeClassName(className))}
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
      className={clsx(styles.control, normalizeClassName(className))}
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
      className={clsx(styles.input, normalizeClassName(className))}
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
      className={clsx(styles.visibilityTrigger, normalizeClassName(className))}
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
      className={clsx(styles.indicator, normalizeClassName(className))}
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
  Label: PasswordInputLabel,
  Control: PasswordInputControl,
  Field: PasswordInputField,
  Input: PasswordInputInput,
  VisibilityTrigger: PasswordInputVisibilityTrigger,
  Indicator: PasswordInputIndicator,
});

export { PasswordInput, usePasswordInput };