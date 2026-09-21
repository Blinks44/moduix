'use client';

import {
  Checkbox as CheckboxPrimitive,
  useCheckbox,
  useCheckboxContext,
  useCheckboxGroup,
  useCheckboxGroupContext,
} from '@ark-ui/react/checkbox';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui';

type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type RootProps = ComponentProps<typeof CheckboxPrimitive.Root> & { size?: CheckboxSize };
type RootProviderProps = ComponentProps<typeof CheckboxPrimitive.RootProvider> & {
  size?: CheckboxSize;
};

const Checkbox = forwardRef<ComponentRef<typeof CheckboxPrimitive.Root>, RootProps>(
  function Checkbox({ className, size = 'md', ...props }, ref) {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          'group/checkbox inline-flex cursor-pointer items-center gap-2 align-middle text-foreground data-disabled:cursor-default data-disabled:opacity-50 data-readonly:cursor-default',
          className,
        )}
        {...props}
        data-size={size}
        data-slot="checkbox-root"
      />
    );
  },
);

const CheckboxRootProvider = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.RootProvider>,
  RootProviderProps
>(function CheckboxRootProvider({ className, size = 'md', ...props }, ref) {
  return (
    <CheckboxPrimitive.RootProvider
      ref={ref}
      className={cn(
        'group/checkbox inline-flex cursor-pointer items-center gap-2 align-middle text-foreground data-disabled:cursor-default data-disabled:opacity-50 data-readonly:cursor-default',
        className,
      )}
      {...props}
      data-size={size}
      data-slot="checkbox-root-provider"
    />
  );
});

const CheckboxIndicator = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Indicator>,
  ComponentProps<typeof CheckboxPrimitive.Indicator>
>(function CheckboxIndicator({ className, children, indeterminate, ...props }, ref) {
  const slot = indeterminate
    ? 'checkbox-indicator-indeterminate-icon'
    : 'checkbox-indicator-checked-icon';

  return (
    <CheckboxPrimitive.Indicator
      ref={ref}
      className={cn(
        'inline-flex h-full w-full items-center justify-center text-inherit',
        className,
      )}
      indeterminate={indeterminate}
      {...props}
      data-slot="checkbox-indicator"
    >
      {children ?? (
        <span
          aria-hidden="true"
          data-slot={slot}
          className={cn(
            'inline-flex size-3 items-center justify-center leading-none text-inherit group-data-[size=lg]/checkbox:size-3.5 group-data-[size=sm]/checkbox:size-2.5 group-data-[size=xl]/checkbox:size-4 group-data-[size=xs]/checkbox:size-2 [&>svg]:size-full',
          )}
        >
          {indeterminate ? <IndeterminateIcon /> : <CheckIcon />}
        </span>
      )}
    </CheckboxPrimitive.Indicator>
  );
});

const CheckboxControl = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Control>,
  ComponentProps<typeof CheckboxPrimitive.Control>
>(function CheckboxControl({ children, className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Control
      ref={ref}
      className={cn(
        "[@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly])[data-state='unchecked'][data-hover]:bg-accent box-border inline-flex size-5 shrink-0 items-center justify-center rounded-xs border border-border bg-background p-0 leading-none text-primary-foreground transition-[background-color,border-color,color,opacity] duration-200 select-none group-data-[size=lg]/checkbox:size-control-xs group-data-[size=sm]/checkbox:size-4 group-data-[size=xl]/checkbox:size-7 group-data-[size=xs]/checkbox:size-3.5 data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:border-destructive data-invalid:text-destructive-foreground data-invalid:data-focus-visible:outline-destructive data-[state=checked]:border-primary data-[state=checked]:bg-primary data-invalid:data-[state=checked]:border-destructive data-invalid:data-[state=checked]:bg-destructive data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-invalid:data-[state=indeterminate]:border-destructive data-invalid:data-[state=indeterminate]:bg-destructive motion-reduce:transition-none",
        className,
      )}
      {...props}
      data-slot="checkbox-control"
    >
      {children ?? (
        <>
          <CheckboxIndicator />
          <CheckboxIndicator indeterminate />
        </>
      )}
    </CheckboxPrimitive.Control>
  );
});

const CheckboxLabel = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Label>,
  ComponentProps<typeof CheckboxPrimitive.Label>
>(function CheckboxLabel({ className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Label
      ref={ref}
      className={cn('text-sm leading-5 font-medium text-inherit', className)}
      {...props}
      data-slot="checkbox-label"
    />
  );
});

const CheckboxGroup = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Group>,
  ComponentProps<typeof CheckboxPrimitive.Group>
>(function CheckboxGroup({ className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Group
      ref={ref}
      className={cn('flex flex-col gap-2 text-foreground', className)}
      {...props}
      data-slot="checkbox-group"
    />
  );
});

const CheckboxContext = CheckboxPrimitive.Context;
const CheckboxHiddenInput = CheckboxPrimitive.HiddenInput;

export {
  Checkbox,
  CheckboxContext,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRootProvider,
  useCheckbox,
  useCheckboxContext,
  useCheckboxGroup,
  useCheckboxGroupContext,
};