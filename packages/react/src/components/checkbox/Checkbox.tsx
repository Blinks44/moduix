'use client';

import {
  Checkbox as CheckboxPrimitive,
  useCheckbox,
  useCheckboxContext,
  useCheckboxGroup,
  useCheckboxGroupContext,
} from '@ark-ui/react/checkbox';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { CheckIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui';
import styles from './Checkbox.module.css';

type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type RootProps = ComponentProps<typeof CheckboxPrimitive.Root> & { size?: CheckboxSize };
type RootProviderProps = ComponentProps<typeof CheckboxPrimitive.RootProvider> & {
  size?: CheckboxSize;
};

const CheckboxRoot = forwardRef<ComponentRef<typeof CheckboxPrimitive.Root>, RootProps>(
  function CheckboxRoot({ className, size = 'md', ...props }, ref) {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={clsx(styles.root, className)}
        {...props}
        data-size={size}
        data-slot="checkbox-root"
      />
    );
  },
);

const CheckboxRootProvider = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.RootProvider>,
  RootProviderProps
>(function CheckboxRootProvider({ className, size = 'md', ...props }, ref) {
  return (
    <CheckboxPrimitive.RootProvider
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-size={size}
      data-slot="checkbox-root-provider"
    />
  );
});

const CheckboxIndicator = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Indicator>,
  ComponentProps<typeof CheckboxPrimitive.Indicator>
>(function CheckboxIndicator({ className, children, indeterminate, ...props }, ref) {
  const slot = indeterminate
    ? 'checkbox-indicator-indeterminate-icon'
    : 'checkbox-indicator-checked-icon';

  return (
    <CheckboxPrimitive.Indicator
      ref={ref}
      className={clsx(styles.indicator, className)}
      indeterminate={indeterminate}
      {...props}
      data-slot="checkbox-indicator"
    >
      {children ?? (
        <span aria-hidden="true" data-slot={slot} className={styles.icon}>
          {indeterminate ? <IndeterminateIcon /> : <CheckIcon />}
        </span>
      )}
    </CheckboxPrimitive.Indicator>
  );
});

const CheckboxControl = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Control>,
  ComponentProps<typeof CheckboxPrimitive.Control>
>(function CheckboxControl({ children, className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Control
      ref={ref}
      className={clsx(styles.control, className)}
      {...props}
      data-slot="checkbox-control"
    >
      {children ?? (
        <>
          <CheckboxIndicator />
          <CheckboxIndicator indeterminate />
        </>
      )}
    </CheckboxPrimitive.Control>
  );
});

const CheckboxLabel = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Label>,
  ComponentProps<typeof CheckboxPrimitive.Label>
>(function CheckboxLabel({ className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Label
      ref={ref}
      className={clsx(styles.label, className)}
      {...props}
      data-slot="checkbox-label"
    />
  );
});

const CheckboxGroup = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Group>,
  ComponentProps<typeof CheckboxPrimitive.Group>
>(function CheckboxGroup({ className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Group
      ref={ref}
      className={clsx(styles.group, className)}
      {...props}
      data-slot="checkbox-group"
    />
  );
});

const Checkbox = Object.assign(CheckboxRoot, {
  Root: CheckboxRoot,
  RootProvider: CheckboxRootProvider,
  Context: CheckboxPrimitive.Context,
  HiddenInput: CheckboxPrimitive.HiddenInput,
  Control: CheckboxControl,
  Indicator: CheckboxIndicator,
  Label: CheckboxLabel,
  Group: CheckboxGroup,
});

export { Checkbox, useCheckbox, useCheckboxContext, useCheckboxGroup, useCheckboxGroupContext };