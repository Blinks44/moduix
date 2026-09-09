'use client';

import {
  Switch as SwitchPrimitive,
  SwitchContext,
  useSwitch,
  useSwitchContext,
} from '@ark-ui/react/switch';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SwitchRootProps = ComponentProps<typeof SwitchPrimitive.Root> & { size?: SwitchSize };
type SwitchRootProviderProps = ComponentProps<typeof SwitchPrimitive.RootProvider> & {
  size?: SwitchSize;
};

const SwitchRoot = forwardRef<ComponentRef<typeof SwitchPrimitive.Root>, SwitchRootProps>(
  function SwitchRoot({ className, size = 'md', ...props }, ref) {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        data-slot="switch-root"
        data-size={size}
        className={cn(
          'group/switch inline-flex w-fit cursor-pointer items-center gap-2 align-middle data-disabled:cursor-default data-disabled:opacity-50 data-readonly:cursor-default',
          className,
        )}
        {...props}
      />
    );
  },
);

const SwitchRootProvider = forwardRef<
  ComponentRef<typeof SwitchPrimitive.RootProvider>,
  SwitchRootProviderProps
>(function SwitchRootProvider({ className, size = 'md', ...props }, ref) {
  return (
    <SwitchPrimitive.RootProvider
      ref={ref}
      data-slot="switch-root-provider"
      data-size={size}
      className={cn(
        'group/switch inline-flex w-fit cursor-pointer items-center gap-2 align-middle data-disabled:cursor-default data-disabled:opacity-50 data-readonly:cursor-default',
        className,
      )}
      {...props}
    />
  );
});

const SwitchControl = forwardRef<
  ComponentRef<typeof SwitchPrimitive.Control>,
  ComponentProps<typeof SwitchPrimitive.Control>
>(function SwitchControl({ className, children, ...props }, ref) {
  return (
    <SwitchPrimitive.Control
      ref={ref}
      data-slot="switch-control"
      className={cn(
        "[@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly])[data-state='unchecked'][data-hover]:bg-accent relative inline-flex h-control-xs w-11 shrink-0 items-center rounded-full border border-border bg-muted p-0.5 leading-none outline-0 transition-[background-color,border-color,opacity] duration-200 ease-in-out select-none group-data-[size=lg]/switch:h-7 group-data-[size=lg]/switch:w-13 group-data-[size=sm]/switch:h-5 group-data-[size=sm]/switch:w-9 group-data-[size=xl]/switch:h-control-sm group-data-[size=xl]/switch:w-15 group-data-[size=xs]/switch:h-4 group-data-[size=xs]/switch:w-7 data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:border-destructive data-[state=checked]:border-primary data-[state=checked]:bg-primary motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {children ?? <SwitchThumb />}
    </SwitchPrimitive.Control>
  );
});

const SwitchThumb = forwardRef<
  ComponentRef<typeof SwitchPrimitive.Thumb>,
  ComponentProps<typeof SwitchPrimitive.Thumb>
>(function SwitchThumb({ className, ...props }, ref) {
  return (
    <SwitchPrimitive.Thumb
      ref={ref}
      data-slot="switch-thumb"
      className={cn(
        'inline-flex size-5 translate-x-0 items-center justify-center rounded-full border-transparent bg-background text-muted shadow-sm transition-[translate,background-color,color] duration-200 ease-in-out group-data-[size=lg]/switch:size-control-xs group-data-[size=sm]/switch:size-4 group-data-[size=xl]/switch:size-7 group-data-[size=xs]/switch:size-3 data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary group-data-[size=lg]/switch:data-[state=checked]:translate-x-[22px] group-data-[size=sm]/switch:data-[state=checked]:translate-x-[14px] group-data-[size=xl]/switch:data-[state=checked]:translate-x-[26px] group-data-[size=xs]/switch:data-[state=checked]:translate-x-[10px] motion-reduce:transition-none rtl:data-[state=checked]:-translate-x-[18px] group-data-[size=lg]/switch:rtl:data-[state=checked]:-translate-x-[22px] group-data-[size=sm]/switch:rtl:data-[state=checked]:-translate-x-[14px] group-data-[size=xl]/switch:rtl:data-[state=checked]:-translate-x-[26px] group-data-[size=xs]/switch:rtl:data-[state=checked]:-translate-x-[10px] [&>svg]:block [&>svg]:size-[65%] [&>svg]:shrink-0',
        className,
      )}
      {...props}
    />
  );
});

const SwitchLabel = forwardRef<
  ComponentRef<typeof SwitchPrimitive.Label>,
  ComponentProps<typeof SwitchPrimitive.Label>
>(function SwitchLabel({ className, ...props }, ref) {
  return (
    <SwitchPrimitive.Label
      ref={ref}
      data-slot="switch-label"
      className={cn('text-sm leading-5 font-medium text-foreground select-none', className)}
      {...props}
    />
  );
});

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