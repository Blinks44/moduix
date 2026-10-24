import { Switch as SwitchPrimitive, useSwitch, useSwitchContext } from '@ark-ui/solid/switch';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SwitchRootProps = ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: SwitchSize;
};
type SwitchRootProviderProps = ComponentProps<typeof SwitchPrimitive.RootProvider> & {
  size?: SwitchSize;
};

function Switch(props: SwitchRootProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'size']);

  return (
    <SwitchPrimitive.Root
      class={cn(
        'group/switch inline-flex w-fit cursor-pointer items-center gap-2 align-middle text-foreground data-disabled:cursor-default data-disabled:opacity-disabled data-readonly:cursor-default',
        local.class,
      )}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="switch-root"
    >
      {local.children}
    </SwitchPrimitive.Root>
  );
}

function SwitchRootProvider(props: SwitchRootProviderProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'size']);

  return (
    <SwitchPrimitive.RootProvider
      class={cn(
        'group/switch inline-flex w-fit cursor-pointer items-center gap-2 align-middle text-foreground data-disabled:cursor-default data-disabled:opacity-disabled data-readonly:cursor-default',
        local.class,
      )}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="switch-root-provider"
    >
      {local.children}
    </SwitchPrimitive.RootProvider>
  );
}

function SwitchControl(props: ComponentProps<typeof SwitchPrimitive.Control>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <SwitchPrimitive.Control
      class={cn(
        "relative inline-flex h-control-xs w-11 shrink-0 rounded-full border border-border bg-muted transition-[background-color,border-color] duration-normal ease-in-out select-none group-data-[size=lg]/switch:h-[1.75rem] group-data-[size=lg]/switch:w-13 group-data-[size=sm]/switch:h-[1.25rem] group-data-[size=sm]/switch:w-9 group-data-[size=xl]/switch:h-control-sm group-data-[size=xl]/switch:w-15 group-data-[size=xs]/switch:h-[1rem] group-data-[size=xs]/switch:w-7 data-focus-visible:outline-focus-inset data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:border-destructive data-invalid:data-focus-visible:outline-destructive data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:data-invalid:border-destructive [@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly])[data-state='unchecked'][data-hover]]:bg-accent",
        local.class,
      )}
      {...others}
      data-slot="switch-control"
    >
      {resolvedChildren() ?? <SwitchThumb />}
    </SwitchPrimitive.Control>
  );
}

function SwitchThumb(props: ComponentProps<typeof SwitchPrimitive.Thumb>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SwitchPrimitive.Thumb
      class={cn(
        'absolute start-0.5 top-1/2 inline-flex aspect-square h-[calc(100%-var(--moduix-spacing-0-5)*2)] -translate-y-1/2 items-center justify-center rounded-full bg-background text-muted shadow-sm transition-[inset-inline-start,translate,background-color,color] duration-normal ease-in-out data-[state=checked]:start-[calc(100%-var(--moduix-spacing-0-5))] data-[state=checked]:-translate-x-full data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary [&>svg]:size-[65%] data-[state=checked]:[&[dir=rtl]]:translate-x-full',
        local.class,
      )}
      {...others}
      data-slot="switch-thumb"
    />
  );
}

function SwitchLabel(props: ComponentProps<typeof SwitchPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SwitchPrimitive.Label
      class={cn('text-sm leading-5 font-medium select-none', local.class)}
      {...others}
      data-slot="switch-label"
    />
  );
}

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
} from '@ark-ui/solid/switch';
export type { SwitchRootProps, SwitchRootProviderProps, SwitchSize };