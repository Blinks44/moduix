'use client';

import { Switch as SwitchPrimitive, useSwitch, useSwitchContext } from '@ark-ui/react/switch';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import styles from './Switch.module.css';

type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SwitchRootProps = ComponentProps<typeof SwitchPrimitive.Root> & {
  hiddenInput?: boolean;
  hiddenInputProps?: ComponentProps<typeof SwitchPrimitive.HiddenInput>;
  label?: ReactNode;
  size?: SwitchSize;
};
type SwitchRootProviderProps = ComponentProps<typeof SwitchPrimitive.RootProvider> & {
  size?: SwitchSize;
};

const Switch = forwardRef<ComponentRef<typeof SwitchPrimitive.Root>, SwitchRootProps>(
  function Switch(
    { asChild, children, className, hiddenInput, hiddenInputProps, label, size = 'md', ...props },
    ref,
  ) {
    const content = asChild ? (
      children
    ) : children === undefined ? (
      <>
        <SwitchControl />
        {label != null ? <SwitchLabel>{label}</SwitchLabel> : null}
        {hiddenInput !== false ? <SwitchHiddenInput {...hiddenInputProps} /> : null}
      </>
    ) : (
      <>
        {children}
        {hiddenInput ? <SwitchHiddenInput {...hiddenInputProps} /> : null}
      </>
    );

    return (
      <SwitchPrimitive.Root
        ref={ref}
        asChild={asChild}
        className={clsx(styles.root, className)}
        {...props}
        data-size={size}
        data-slot="switch-root"
      >
        {content}
      </SwitchPrimitive.Root>
    );
  },
);

const SwitchRootProvider = forwardRef<
  ComponentRef<typeof SwitchPrimitive.RootProvider>,
  SwitchRootProviderProps
>(function SwitchRootProvider({ className, size = 'md', ...props }, ref) {
  return (
    <SwitchPrimitive.RootProvider
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-size={size}
      data-slot="switch-root-provider"
    />
  );
});

const SwitchControl = forwardRef<
  ComponentRef<typeof SwitchPrimitive.Control>,
  ComponentProps<typeof SwitchPrimitive.Control>
>(function SwitchControl({ className, children, ...props }, ref) {
  return (
    <SwitchPrimitive.Control
      ref={ref}
      className={clsx(styles.control, className)}
      {...props}
      data-slot="switch-control"
    >
      {children ?? <SwitchThumb />}
    </SwitchPrimitive.Control>
  );
});

const SwitchThumb = forwardRef<
  ComponentRef<typeof SwitchPrimitive.Thumb>,
  ComponentProps<typeof SwitchPrimitive.Thumb>
>(function SwitchThumb({ className, ...props }, ref) {
  return (
    <SwitchPrimitive.Thumb
      ref={ref}
      className={clsx(styles.thumb, className)}
      {...props}
      data-slot="switch-thumb"
    />
  );
});

const SwitchLabel = forwardRef<
  ComponentRef<typeof SwitchPrimitive.Label>,
  ComponentProps<typeof SwitchPrimitive.Label>
>(function SwitchLabel({ className, ...props }, ref) {
  return (
    <SwitchPrimitive.Label
      ref={ref}
      className={clsx(styles.label, className)}
      {...props}
      data-slot="switch-label"
    />
  );
});

const SwitchContext = SwitchPrimitive.Context;
const SwitchHiddenInput = SwitchPrimitive.HiddenInput;

export {
  Switch,
  SwitchContext,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  SwitchThumb,
  useSwitch,
  useSwitchContext,
};
export type {
  SwitchCheckedChangeDetails,
  SwitchContextProps,
  SwitchControlProps,
  SwitchHiddenInputProps,
  SwitchLabelProps,
  SwitchThumbProps,
  UseSwitchContext,
  UseSwitchProps,
  UseSwitchReturn,
} from '@ark-ui/react/switch';
export type { SwitchRootProps, SwitchRootProviderProps, SwitchSize };