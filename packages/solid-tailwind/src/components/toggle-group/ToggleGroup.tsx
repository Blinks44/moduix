import {
  ToggleGroup as ToggleGroupPrimitive,
  useToggleGroup,
  useToggleGroupContext,
} from '@ark-ui/solid/toggle-group';
import { cva } from 'class-variance-authority';
import type { Accessor, ComponentProps } from 'solid-js';
import { createContext, splitProps, useContext } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type ToggleVariant = 'default' | 'outline' | 'ghost';
type ToggleSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg';

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
  'box-border inline-flex min-h-control-md flex-none cursor-pointer items-center justify-center gap-2 rounded-md border text-sm font-medium appearance-none transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none whitespace-nowrap data-focus-visible:outline-2 data-focus-visible:-outline-offset-1 data-focus-visible:outline-ring group-data-[orientation=vertical]/toggle-group:w-full group-data-[orientation=vertical]/toggle-group:justify-start data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none data-[state=off]:active:bg-accent [@media(hover:hover)]:data-[state=off]:hover:bg-accent [&>svg]:block [&>svg]:size-4 [&>svg]:shrink-0',
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

function ToggleGroupRoot(props: ToggleGroupRootProps) {
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
      class={cn(toggleGroupItemVariants({ variant: variant(), size: size() }), local.class)}
    >
      {local.children}
    </ToggleGroupPrimitive.Item>
  );
}

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