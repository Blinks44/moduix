import {
  ToggleGroup as ToggleGroupPrimitive,
  useToggleGroup,
  useToggleGroupContext,
} from '@ark-ui/solid/toggle-group';
import { cva } from 'class-variance-authority';
import type { Accessor, ComponentProps } from 'solid-js';
import { createContext, splitProps, useContext } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { toggleVariants } from '../toggle/Toggle';
import type { ToggleSize, ToggleVariant } from '../toggle/Toggle';

const defaultToggleGroupStyles = {
  variant: () => 'default' as ToggleVariant,
  size: () => 'md' as ToggleSize,
};

type ToggleGroupStyleContextValue = {
  variant: Accessor<ToggleVariant>;
  size: Accessor<ToggleSize>;
};

const ToggleGroupStyleContext =
  createContext<ToggleGroupStyleContextValue>(defaultToggleGroupStyles);

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

function ToggleGroup(props: ToggleGroupRootProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size', 'variant']);
  const variant = () => local.variant ?? 'default';
  const size = () => local.size ?? 'md';

  return (
    <ToggleGroupStyleContext.Provider value={{ variant, size }}>
      <ToggleGroupPrimitive.Root
        asChild={local.asChild}
        {...others}
        data-slot="toggle-group-root"
        data-variant={variant()}
        data-size={size()}
        class={cn(toggleGroupRootVariants({ variant: variant() }), local.class)}
      >
        {local.children}
      </ToggleGroupPrimitive.Root>
    </ToggleGroupStyleContext.Provider>
  );
}

function ToggleGroupRootProvider(props: ToggleGroupRootProviderProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size', 'variant']);
  const variant = () => local.variant ?? 'default';
  const size = () => local.size ?? 'md';

  return (
    <ToggleGroupStyleContext.Provider value={{ variant, size }}>
      <ToggleGroupPrimitive.RootProvider
        asChild={local.asChild}
        {...others}
        data-slot="toggle-group-root-provider"
        data-variant={variant()}
        data-size={size()}
        class={cn(toggleGroupRootVariants({ variant: variant() }), local.class)}
      >
        {local.children}
      </ToggleGroupPrimitive.RootProvider>
    </ToggleGroupStyleContext.Provider>
  );
}

function ToggleGroupItem(props: ToggleGroupItemProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size', 'variant']);
  const inherited = useContext(ToggleGroupStyleContext);
  const variant = () => local.variant ?? inherited.variant();
  const size = () => local.size ?? inherited.size();

  return (
    <ToggleGroupPrimitive.Item
      asChild={local.asChild}
      {...others}
      data-slot="toggle-group-item"
      data-variant={variant()}
      data-size={size()}
      class={cn(
        toggleVariants({ variant: variant(), size: size() }),
        'flex-none text-foreground group-data-[orientation=vertical]/toggle-group:w-full group-data-[orientation=vertical]/toggle-group:justify-start',
        local.class,
      )}
    >
      {local.children}
    </ToggleGroupPrimitive.Item>
  );
}

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
