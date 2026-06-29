import type { ComponentProps, ComponentRef } from 'react';
import {
  ToggleGroup as ToggleGroupPrimitive,
  useToggleGroup,
  useToggleGroupContext,
} from '@ark-ui/react/toggle-group';
import { clsx } from 'clsx';
import { createContext, forwardRef, useContext, useMemo } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import toggleStyles from '../toggle/Toggle.module.css';
import styles from './ToggleGroup.module.css';

type ToggleVariant = 'default' | 'outline' | 'ghost';
type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg';

const ToggleGroupStyleContext = createContext<{
  variant: ToggleVariant;
  size: ToggleSize;
}>({
  variant: 'default',
  size: 'md',
});

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

const ToggleGroupRoot = forwardRef<
  ComponentRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupRootProps
>(function ToggleGroupRoot({ className, variant = 'default', size = 'md', ...props }, ref) {
  const contextValue = useMemo(() => ({ variant, size }), [size, variant]);

  return (
    <ToggleGroupStyleContext.Provider value={contextValue}>
      <ToggleGroupPrimitive.Root
        ref={ref}
        data-slot="toggle-group-root"
        data-variant={variant}
        data-size={size}
        className={clsx(styles.root, normalizeClassName(className))}
        {...props}
      />
    </ToggleGroupStyleContext.Provider>
  );
});

const ToggleGroupRootProvider = forwardRef<
  ComponentRef<typeof ToggleGroupPrimitive.RootProvider>,
  ToggleGroupRootProviderProps
>(function ToggleGroupRootProvider({ className, variant = 'default', size = 'md', ...props }, ref) {
  const contextValue = useMemo(() => ({ variant, size }), [size, variant]);

  return (
    <ToggleGroupStyleContext.Provider value={contextValue}>
      <ToggleGroupPrimitive.RootProvider
        ref={ref}
        data-slot="toggle-group-root-provider"
        data-variant={variant}
        data-size={size}
        className={clsx(styles.root, normalizeClassName(className))}
        {...props}
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
      ref={ref}
      data-slot="toggle-group-item"
      data-variant={variant ?? inherited.variant}
      data-size={size ?? inherited.size}
      className={clsx(toggleStyles.root, styles.item, normalizeClassName(className))}
      {...props}
    />
  );
});

const ToggleGroupContextPart = ToggleGroupPrimitive.Context;

const ToggleGroup = Object.assign(ToggleGroupRoot, {
  Root: ToggleGroupRoot,
  RootProvider: ToggleGroupRootProvider,
  Item: ToggleGroupItem,
  Context: ToggleGroupContextPart,
});

export { ToggleGroup, useToggleGroup, useToggleGroupContext };
export type {
  ToggleGroupItemProps,
  ToggleGroupRootProps,
  ToggleGroupRootProviderProps,
  ToggleSize,
  ToggleVariant,
};
export type {
  ToggleGroupContextProps,
  ToggleGroupItemBaseProps,
  ToggleGroupRootBaseProps,
  ToggleGroupRootProviderBaseProps,
  ToggleGroupValueChangeDetails,
  UseToggleGroupContext,
  UseToggleGroupProps,
  UseToggleGroupReturn,
} from '@ark-ui/react/toggle-group';