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
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size']);

  return (
    <SwitchPrimitive.Root
      asChild={local.asChild}
      class={cn(
        'group/switch inline-flex w-fit cursor-pointer items-center gap-2 align-middle data-disabled:cursor-default data-disabled:opacity-50 data-readonly:cursor-default',
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
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size']);

  return (
    <SwitchPrimitive.RootProvider
      asChild={local.asChild}
      class={cn(
        'group/switch inline-flex w-fit cursor-pointer items-center gap-2 align-middle data-disabled:cursor-default data-disabled:opacity-50 data-readonly:cursor-default',
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
        "relative inline-flex h-[var(--switch-height)] w-11 shrink-0 items-center rounded-full border border-border bg-muted p-0.5 leading-none outline-0 transition-[background-color,border-color,opacity] duration-200 ease-in-out select-none [--switch-height:var(--moduix-size-xs)] [--switch-thumb-size:calc(var(--switch-height)-var(--moduix-spacing-0-5)*2-2px)] group-data-[size=lg]/switch:w-13 group-data-[size=lg]/switch:[--switch-height:1.75rem] group-data-[size=sm]/switch:w-9 group-data-[size=sm]/switch:[--switch-height:1.25rem] group-data-[size=xl]/switch:w-15 group-data-[size=xl]/switch:[--switch-height:var(--moduix-size-sm)] group-data-[size=xs]/switch:w-7 group-data-[size=xs]/switch:[--switch-height:1rem] data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:border-destructive data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:data-invalid:border-destructive motion-reduce:transition-none [@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly])[data-state='unchecked'][data-hover]]:bg-accent",
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
        'absolute start-0.5 top-1/2 inline-flex size-[var(--switch-thumb-size)] shrink-0 translate-x-0 -translate-y-1/2 items-center justify-center rounded-full border-transparent bg-background text-muted shadow-sm transition-[inset-inline-start,translate,background-color,color] duration-200 ease-in-out data-[state=checked]:start-[calc(100%-var(--moduix-spacing-0-5))] data-[state=checked]:-translate-x-full data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary motion-reduce:transition-none [&:dir(rtl)]:data-[state=checked]:translate-x-full [&>svg]:block [&>svg]:size-[65%] [&>svg]:shrink-0',
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
      class={cn('text-sm leading-5 font-medium text-foreground select-none', local.class)}
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
export type { SwitchRootProps, SwitchRootProviderProps, SwitchSize };