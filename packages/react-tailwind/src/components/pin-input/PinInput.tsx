'use client';

import {
  PinInput as PinInputPrimitive,
  usePinInput as usePinInputPrimitive,
  usePinInputContext,
  type UsePinInputProps,
} from '@ark-ui/react/pin-input';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui';

const PinInputRoot = forwardRef<
  ComponentRef<typeof PinInputPrimitive.Root>,
  ComponentProps<typeof PinInputPrimitive.Root>
>(function PinInputRoot({ className, count, placeholder = '', ...props }, ref) {
  return (
    <PinInputPrimitive.Root
      ref={ref}
      data-slot="pin-input-root"
      className={cn(
        'inline-flex w-auto max-w-none flex-col items-start gap-2 data-disabled:opacity-50',
        className,
      )}
      count={count}
      placeholder={placeholder}
      {...props}
    />
  );
});

const PinInputRootProvider = forwardRef<
  ComponentRef<typeof PinInputPrimitive.RootProvider>,
  ComponentProps<typeof PinInputPrimitive.RootProvider>
>(function PinInputRootProvider({ className, ...props }, ref) {
  return (
    <PinInputPrimitive.RootProvider
      ref={ref}
      data-slot="pin-input-root-provider"
      className={cn(
        'inline-flex w-auto max-w-none flex-col items-start gap-2 data-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
});

const PinInputLabel = forwardRef<
  ComponentRef<typeof PinInputPrimitive.Label>,
  ComponentProps<typeof PinInputPrimitive.Label>
>(function PinInputLabel({ className, ...props }, ref) {
  return (
    <PinInputPrimitive.Label
      ref={ref}
      data-slot="pin-input-label"
      className={cn('text-sm leading-5 font-medium text-foreground', className)}
      {...props}
    />
  );
});

const PinInputControl = forwardRef<
  ComponentRef<typeof PinInputPrimitive.Control>,
  ComponentProps<typeof PinInputPrimitive.Control>
>(function PinInputControl({ className, ...props }, ref) {
  return (
    <PinInputPrimitive.Control
      ref={ref}
      data-slot="pin-input-control"
      className={cn('inline-flex items-center gap-2', className)}
      {...props}
    />
  );
});

const PinInputInput = forwardRef<
  ComponentRef<typeof PinInputPrimitive.Input>,
  ComponentProps<typeof PinInputPrimitive.Input>
>(function PinInputInput({ className, ...props }, ref) {
  return (
    <PinInputPrimitive.Input
      ref={ref}
      data-slot="pin-input-input"
      className={cn(
        'size-control-md flex-none rounded-md border border-border bg-background px-0 py-0 text-center text-lg leading-7 font-medium text-foreground tabular-nums outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color] duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none data-disabled:pointer-events-none data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        className,
      )}
      {...props}
    />
  );
});

function PinInputInputs({ className }: { className?: string }) {
  const { items } = usePinInputContext();

  return items.map((index) => <PinInputInput key={index} index={index} className={className} />);
}

function PinInputSeparator({
  className,
  'aria-hidden': ariaHidden = true,
  role = 'presentation',
  children,
  ...props
}: ComponentProps<'span'>) {
  return (
    <span
      data-slot="pin-input-separator"
      aria-hidden={ariaHidden}
      role={role}
      className={cn(
        'pointer-events-none inline-flex size-4 flex-none items-center justify-center leading-none text-muted-foreground [&>svg]:size-full [&>svg]:flex-none',
        className,
      )}
      {...props}
    >
      {children ?? <SeparatorMarkIcon />}
    </span>
  );
}

function usePinInput(props: UsePinInputProps = {}) {
  return usePinInputPrimitive({ placeholder: '', ...props });
}

const PinInput = Object.assign(PinInputRoot, {
  Root: PinInputRoot,
  RootProvider: PinInputRootProvider,
  Context: PinInputPrimitive.Context,
  HiddenInput: PinInputPrimitive.HiddenInput,
  Label: PinInputLabel,
  Control: PinInputControl,
  Input: PinInputInput,
  Inputs: PinInputInputs,
  Separator: PinInputSeparator,
});

export { PinInput, usePinInput, usePinInputContext };