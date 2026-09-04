'use client';

import {
  Switch as SwitchPrimitive,
  SwitchContext,
  useSwitch,
  useSwitchContext,
} from '@ark-ui/react/switch';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import styles from './Switch.module.css';

type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SwitchRootProps = ComponentProps<typeof SwitchPrimitive.Root> & { size?: SwitchSize };
type SwitchRootProviderProps = ComponentProps<typeof SwitchPrimitive.RootProvider> & {
  size?: SwitchSize;
};

const SwitchRoot = forwardRef<ComponentRef<typeof SwitchPrimitive.Root>, SwitchRootProps>(
  function SwitchRoot({ asChild, children, className, size = 'md', ...props }, ref) {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        asChild={asChild}
        data-slot="switch-root"
        data-size={size}
        className={clsx(styles.root, className)}
        {...props}
      >
        {children}
      </SwitchPrimitive.Root>
    );
  },
);

const SwitchRootProvider = forwardRef<
  ComponentRef<typeof SwitchPrimitive.RootProvider>,
  SwitchRootProviderProps
>(function SwitchRootProvider({ asChild, children, className, size = 'md', ...props }, ref) {
  return (
    <SwitchPrimitive.RootProvider
      ref={ref}
      asChild={asChild}
      data-slot="switch-root-provider"
      data-size={size}
      className={clsx(styles.root, className)}
      {...props}
    >
      {children}
    </SwitchPrimitive.RootProvider>
  );
});

const SwitchControl = forwardRef<
  ComponentRef<typeof SwitchPrimitive.Control>,
  ComponentProps<typeof SwitchPrimitive.Control>
>(function SwitchControl({ className, children, ...props }, ref) {
  return (
    <SwitchPrimitive.Control
      ref={ref}
      data-slot="switch-control"
      className={clsx(styles.control, className)}
      {...props}
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
      data-slot="switch-thumb"
      className={clsx(styles.thumb, className)}
      {...props}
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
      data-slot="switch-label"
      className={clsx(styles.label, className)}
      {...props}
    />
  );
});

const Switch = Object.assign(SwitchRoot, {
  Root: SwitchRoot,
  RootProvider: SwitchRootProvider,
  HiddenInput: SwitchPrimitive.HiddenInput,
  Control: SwitchControl,
  Thumb: SwitchThumb,
  Label: SwitchLabel,
  Context: SwitchContext,
});

export { Switch, useSwitch, useSwitchContext };
export type { SwitchRootProps, SwitchRootProviderProps, SwitchSize };