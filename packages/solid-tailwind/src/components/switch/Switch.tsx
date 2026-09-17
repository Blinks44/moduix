import {
  Switch as SwitchPrimitive,
  SwitchContext,
  useSwitch,
  useSwitchContext,
} from '@ark-ui/solid/switch';
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

function SwitchRoot(props: SwitchRootProps) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class', 'size']);

  return (
    <SwitchPrimitive.Root
      asChild={local.asChild}
      data-size={local.size ?? 'md'}
      class={cn(
        'group/switch inline-flex w-fit cursor-pointer items-center gap-2 align-middle data-disabled:cursor-default data-disabled:opacity-50 data-readonly:cursor-default',
        local.class,
      )}
      {...others}
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
        "[@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly])[data-state='unchecked'][data-hover]:bg-accent relative inline-flex h-control-xs w-11 shrink-0 items-center rounded-full border border-border bg-muted p-0.5 leading-none outline-0 transition-[background-color,border-color,opacity] duration-200 ease-in-out select-none group-data-[size=lg]/switch:h-7 group-data-[size=lg]/switch:w-13 group-data-[size=sm]/switch:h-5 group-data-[size=sm]/switch:w-9 group-data-[size=xl]/switch:h-control-sm group-data-[size=xl]/switch:w-15 group-data-[size=xs]/switch:h-4 group-data-[size=xs]/switch:w-7 data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:border-destructive data-[state=checked]:border-primary data-[state=checked]:bg-primary motion-reduce:transition-none",
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
        'inline-flex size-5 translate-x-0 items-center justify-center rounded-full border-transparent bg-background text-muted shadow-sm transition-[translate,background-color,color] duration-200 ease-in-out group-data-[size=lg]/switch:size-control-xs group-data-[size=sm]/switch:size-4 group-data-[size=xl]/switch:size-7 group-data-[size=xs]/switch:size-3 data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary group-data-[size=lg]/switch:data-[state=checked]:translate-x-[22px] group-data-[size=sm]/switch:data-[state=checked]:translate-x-[14px] group-data-[size=xl]/switch:data-[state=checked]:translate-x-[26px] group-data-[size=xs]/switch:data-[state=checked]:translate-x-[10px] motion-reduce:transition-none rtl:data-[state=checked]:-translate-x-[18px] group-data-[size=lg]/switch:rtl:data-[state=checked]:-translate-x-[22px] group-data-[size=sm]/switch:rtl:data-[state=checked]:-translate-x-[14px] group-data-[size=xl]/switch:rtl:data-[state=checked]:-translate-x-[26px] group-data-[size=xs]/switch:rtl:data-[state=checked]:-translate-x-[10px] [&>svg]:block [&>svg]:size-[65%] [&>svg]:shrink-0',
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

const Switch = Object.assign(SwitchRoot, {
  Root: SwitchRoot,
  RootProvider: SwitchRootProvider,
  HiddenInput: SwitchPrimitive.HiddenInput,
  Control: SwitchControl,
  Thumb: SwitchThumb,
  Label: SwitchLabel,
  Context: SwitchContext,
});

export { Switch, useSwitch, useSwitchContext };
export type { SwitchRootProps, SwitchRootProviderProps, SwitchSize };