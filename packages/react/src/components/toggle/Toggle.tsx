'use client';

import { Toggle as TogglePrimitive, ToggleContext, useToggleContext } from '@ark-ui/react/toggle';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import styles from './Toggle.module.css';

type ToggleVariant = 'default' | 'outline' | 'ghost';
type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg';
type ToggleRootProps = ComponentProps<typeof TogglePrimitive.Root> & {
  variant?: ToggleVariant;
  size?: ToggleSize;
};

const ToggleRoot = forwardRef<ComponentRef<typeof TogglePrimitive.Root>, ToggleRootProps>(
  function ToggleRoot({ className, variant = 'default', size = 'md', ...props }, ref) {
    return (
      <TogglePrimitive.Root
        ref={ref}
        data-slot="toggle-root"
        data-variant={variant}
        data-size={size}
        className={clsx(styles.root, className)}
        {...props}
      />
    );
  },
);

const ToggleIndicator = forwardRef<
  ComponentRef<typeof TogglePrimitive.Indicator>,
  ComponentProps<typeof TogglePrimitive.Indicator>
>(function ToggleIndicator({ className, ...props }, ref) {
  return (
    <TogglePrimitive.Indicator
      ref={ref}
      data-slot="toggle-indicator"
      className={clsx(styles.indicator, className)}
      {...props}
    />
  );
});

const Toggle = Object.assign(ToggleRoot, {
  Root: ToggleRoot,
  Indicator: ToggleIndicator,
  Context: ToggleContext,
});

export { Toggle, useToggleContext };
export type { ToggleRootProps, ToggleSize, ToggleVariant };