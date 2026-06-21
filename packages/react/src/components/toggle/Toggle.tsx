import type { ComponentProps, ComponentRef } from 'react';
import { Toggle as TogglePrimitive, useToggle, useToggleContext } from '@ark-ui/react/toggle';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Toggle.module.css';

type ToggleVariant = 'default' | 'outline' | 'ghost';
type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg';

const ToggleRoot = forwardRef<
  ComponentRef<typeof TogglePrimitive.Root>,
  ComponentProps<typeof TogglePrimitive.Root> & {
    variant?: ToggleVariant;
    size?: ToggleSize;
  }
>(function ToggleRoot({ className, variant = 'default', size = 'md', ...props }, ref) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      data-slot="toggle-root"
      data-variant={variant}
      data-size={size}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const ToggleIndicator = forwardRef<
  ComponentRef<typeof TogglePrimitive.Indicator>,
  ComponentProps<typeof TogglePrimitive.Indicator>
>(function ToggleIndicator({ className, ...props }, ref) {
  return (
    <TogglePrimitive.Indicator
      ref={ref}
      data-slot="toggle-indicator"
      className={clsx(styles.indicator, normalizeClassName(className))}
      {...props}
    />
  );
});

const ToggleContext = TogglePrimitive.Context;

const Toggle = Object.assign(ToggleRoot, {
  Root: ToggleRoot,
  Indicator: ToggleIndicator,
  Context: ToggleContext,
});

export { Toggle, useToggle, useToggleContext };
export type {
  ToggleContextProps,
  ToggleIndicatorBaseProps,
  ToggleIndicatorProps,
  ToggleRootBaseProps,
  ToggleRootProps,
  UseToggleContext,
  UseToggleProps,
  UseToggleReturn,
} from '@ark-ui/react/toggle';