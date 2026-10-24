'use client';

import {
  ToggleGroup as ToggleGroupPrimitive,
  useToggleGroup,
  useToggleGroupContext,
} from '@ark-ui/react/toggle-group';
import { cva } from 'class-variance-authority';
import type { ComponentProps, ComponentRef } from 'react';
import { createContext, forwardRef, useContext } from 'react';
import { cn } from '@/lib/moduix/cn';
import type { ToggleSize, ToggleVariant } from '../toggle/Toggle';
import { toggleVariants } from '../toggle/Toggle.variants';

type ToggleGroupStyleProps = {
  variant?: ToggleVariant;
  size?: ToggleSize;
};

const ToggleGroupStyleContext = createContext<Required<ToggleGroupStyleProps>>({
  variant: 'default',
  size: 'md',
});

const toggleGroupRootVariants = cva(
  'group/toggle-group inline-flex max-w-full items-center gap-px overflow-x-auto overscroll-x-contain rounded-lg border border-border bg-muted p-0.5 text-foreground [scrollbar-width:none] data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch [&::-webkit-scrollbar]:hidden',
  {
    variants: {
      variant: {
        default: '',
        outline: 'bg-background',
        ghost: 'border-transparent bg-transparent p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type ToggleGroupRootProps = ComponentProps<typeof ToggleGroupPrimitive.Root> &
  ToggleGroupStyleProps;

type ToggleGroupRootProviderProps = ComponentProps<typeof ToggleGroupPrimitive.RootProvider> &
  ToggleGroupStyleProps;

type ToggleGroupItemProps = ComponentProps<typeof ToggleGroupPrimitive.Item> &
  ToggleGroupStyleProps;

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
        className={cn(toggleGroupRootVariants({ variant }), className)}
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
        className={cn(toggleGroupRootVariants({ variant }), className)}
      />
    </ToggleGroupStyleContext.Provider>
  );
});

const ToggleGroupItem = forwardRef<
  ComponentRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(function ToggleGroupItem({ className, variant, size, ...props }, ref) {
  const inherited = useContext(ToggleGroupStyleContext);
  const itemVariant = variant ?? inherited.variant;
  const itemSize = size ?? inherited.size;

  return (
    <ToggleGroupPrimitive.Item
      {...props}
      ref={ref}
      data-slot="toggle-group-item"
      data-variant={itemVariant}
      data-size={itemSize}
      className={cn(
        toggleVariants({ variant: itemVariant, size: itemSize }),
        'flex-none text-foreground group-data-[orientation=vertical]/toggle-group:w-full group-data-[orientation=vertical]/toggle-group:justify-start',
        className,
      )}
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
  ToggleGroupContextProps,
  ToggleGroupValueChangeDetails,
  UseToggleGroupContext,
  UseToggleGroupProps,
  UseToggleGroupReturn,
} from '@ark-ui/react/toggle-group';
export type {
  ToggleGroupItemProps,
  ToggleGroupRootProps,
  ToggleGroupRootProviderProps,
  ToggleSize,
  ToggleVariant,
};