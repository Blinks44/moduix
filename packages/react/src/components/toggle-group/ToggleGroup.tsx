'use client';

import {
  ToggleGroup as ToggleGroupPrimitive,
  useToggleGroup,
  useToggleGroupContext,
} from '@ark-ui/react/toggle-group';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { createContext, forwardRef, useContext } from 'react';
import type { ToggleSize, ToggleVariant } from '../toggle/Toggle';
import toggleStyles from '../toggle/Toggle.module.css';
import styles from './ToggleGroup.module.css';

const defaultToggleGroupStyles = {
  variant: 'default' as ToggleVariant,
  size: 'md' as ToggleSize,
};

const ToggleGroupStyleContext = createContext<{
  variant: ToggleVariant;
  size: ToggleSize;
}>(defaultToggleGroupStyles);

type ToggleGroupRootProps = ComponentProps<typeof ToggleGroupPrimitive.Root> & {
  variant?: ToggleVariant;
  size?: ToggleSize;
};

type ToggleGroupRootProviderProps = ComponentProps<typeof ToggleGroupPrimitive.RootProvider> & {
  variant?: ToggleVariant;
  size?: ToggleSize;
};

type ToggleGroupItemProps = ComponentProps<typeof ToggleGroupPrimitive.Item> & {
  variant?: ToggleVariant;
  size?: ToggleSize;
};

const ToggleGroup = forwardRef<
  ComponentRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupRootProps
>(function ToggleGroup({ className, variant = 'default', size = 'md', ...props }, ref) {
  return (
    <ToggleGroupStyleContext.Provider value={{ variant, size }}>
      <ToggleGroupPrimitive.Root
        {...props}
        ref={ref}
        data-slot="toggle-group-root"
        data-variant={variant}
        data-size={size}
        className={clsx(styles.root, className)}
      />
    </ToggleGroupStyleContext.Provider>
  );
});

const ToggleGroupRootProvider = forwardRef<
  ComponentRef<typeof ToggleGroupPrimitive.RootProvider>,
  ToggleGroupRootProviderProps
>(function ToggleGroupRootProvider({ className, variant = 'default', size = 'md', ...props }, ref) {
  return (
    <ToggleGroupStyleContext.Provider value={{ variant, size }}>
      <ToggleGroupPrimitive.RootProvider
        {...props}
        ref={ref}
        data-slot="toggle-group-root-provider"
        data-variant={variant}
        data-size={size}
        className={clsx(styles.root, className)}
      />
    </ToggleGroupStyleContext.Provider>
  );
});

const ToggleGroupItem = forwardRef<
  ComponentRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(function ToggleGroupItem({ className, variant, size, ...props }, ref) {
  const inherited = useContext(ToggleGroupStyleContext);

  return (
    <ToggleGroupPrimitive.Item
      {...props}
      ref={ref}
      data-slot="toggle-group-item"
      data-variant={variant ?? inherited.variant}
      data-size={size ?? inherited.size}
      className={clsx(toggleStyles.root, styles.item, className)}
    />
  );
});

const ToggleGroupContext = ToggleGroupPrimitive.Context;

export {
  ToggleGroup,
  ToggleGroupContext,
  ToggleGroupItem,
  ToggleGroupRootProvider,
  useToggleGroup,
  useToggleGroupContext,
};
export type {
  ToggleGroupItemProps,
  ToggleGroupRootProps,
  ToggleGroupRootProviderProps,
  ToggleSize,
  ToggleVariant,
};
