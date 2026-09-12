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

type ToggleVariant = 'default' | 'outline' | 'ghost';
type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg';

const defaultToggleGroupStyles = {
  variant: 'default' as ToggleVariant,
  size: 'md' as ToggleSize,
};

const ToggleGroupStyleContext = createContext<{
  variant: ToggleVariant;
  size: ToggleSize;
}>(defaultToggleGroupStyles);

const toggleGroupRootVariants = cva(
  'group/toggle-group inline-flex max-w-full items-center gap-px overflow-x-auto rounded-lg border border-border bg-muted p-0.5 text-foreground [overscroll-behavior-inline:contain] [scrollbar-width:none] data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch [&::-webkit-scrollbar]:hidden',
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

const toggleGroupItemVariants = cva(
  'box-border inline-flex min-h-control-md flex-none cursor-pointer items-center justify-center gap-2 rounded-md border text-sm font-medium appearance-none transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none whitespace-nowrap focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring group-data-[orientation=vertical]/toggle-group:w-full group-data-[orientation=vertical]/toggle-group:justify-start data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none data-[state=off]:active:bg-accent [@media(hover:hover)]:data-[state=off]:hover:bg-accent [&>svg]:block [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'border-secondary bg-secondary text-secondary-foreground data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground',
        outline:
          'border-border bg-background text-foreground data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground',
        ghost:
          'border-transparent bg-transparent text-foreground data-[state=on]:bg-accent data-[state=on]:text-foreground',
      },
      size: {
        xs: 'min-h-control-xs px-2.5 py-0.5 text-xs',
        sm: 'min-h-control-sm px-3 py-1',
        md: 'min-h-control-md px-4 py-1',
        lg: 'min-h-control-lg px-5 py-1.5 text-md',
        'icon-sm': 'size-control-sm min-w-control-sm gap-0 p-0',
        'icon-md': 'size-control-md min-w-control-md gap-0 p-0',
        'icon-lg': 'size-control-lg min-w-control-lg gap-0 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

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

  return (
    <ToggleGroupPrimitive.Item
      {...props}
      ref={ref}
      data-slot="toggle-group-item"
      data-variant={variant ?? inherited.variant}
      data-size={size ?? inherited.size}
      className={cn(
        toggleGroupItemVariants({
          variant: variant ?? inherited.variant,
          size: size ?? inherited.size,
        }),
        className,
      )}
    />
  );
});

const ToggleGroup = Object.assign(ToggleGroupRoot, {
  Root: ToggleGroupRoot,
  RootProvider: ToggleGroupRootProvider,
  Context: ToggleGroupPrimitive.Context,
  Item: ToggleGroupItem,
});

export { ToggleGroup, useToggleGroup, useToggleGroupContext };
export type {
  ToggleGroupItemProps,
  ToggleGroupRootProps,
  ToggleGroupRootProviderProps,
  ToggleSize,
  ToggleVariant,
};