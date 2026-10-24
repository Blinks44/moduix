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

type PinInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type PinInputRootProps = ComponentProps<typeof PinInputPrimitive.Root> & {
  size?: PinInputSize;
};
type PinInputRootProviderProps = ComponentProps<typeof PinInputPrimitive.RootProvider> & {
  size?: PinInputSize;
};

const rootClass =
  'group/pin-input inline-flex flex-col items-start gap-2 text-foreground data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

const PinInput = forwardRef<ComponentRef<typeof PinInputPrimitive.Root>, PinInputRootProps>(
  function PinInput({ className, placeholder = '', size = 'md', ...props }, ref) {
    return (
      <PinInputPrimitive.Root
        ref={ref}
        className={cn(rootClass, className)}
        placeholder={placeholder}
        {...props}
        data-size={size}
        data-slot="pin-input-root"
      />
    );
  },
);

const PinInputRootProvider = forwardRef<
  ComponentRef<typeof PinInputPrimitive.RootProvider>,
  PinInputRootProviderProps
>(function PinInputRootProvider({ className, size = 'md', ...props }, ref) {
  return (
    <PinInputPrimitive.RootProvider
      ref={ref}
      className={cn(rootClass, className)}
      {...props}
      data-size={size}
      data-slot="pin-input-root-provider"
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
      className={cn('text-sm font-medium', className)}
      {...props}
      data-slot="pin-input-label"
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
      className={cn('inline-flex items-center gap-2', className)}
      {...props}
      data-slot="pin-input-control"
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
      className={cn(
        'size-control-md flex-none rounded-md border border-border bg-background p-0 text-center text-lg font-medium text-inherit tabular-nums outline-focus-inset outline-offset-focus-inset outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out group-data-[size=lg]/pin-input:size-control-lg group-data-[size=lg]/pin-input:text-xl group-data-[size=sm]/pin-input:size-control-sm group-data-[size=sm]/pin-input:text-md group-data-[size=xl]/pin-input:size-control-xl group-data-[size=xl]/pin-input:text-2xl group-data-[size=xs]/pin-input:size-control-xs group-data-[size=xs]/pin-input:text-sm placeholder:text-muted-foreground focus-visible:outline-ring data-invalid:border-destructive data-invalid:focus-visible:outline-destructive',
        className,
      )}
      {...props}
      data-slot="pin-input-input"
    />
  );
});

function PinInputInputs({ className }: { className?: string }) {
  const { items } = usePinInputContext();

  return items.map((index) => <PinInputInput key={index} index={index} className={className} />);
}

const PinInputSeparator = forwardRef<HTMLSpanElement, ComponentProps<'span'>>(
  function PinInputSeparator({ className, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        aria-hidden
        className={cn(
          'inline-flex size-4 flex-none text-muted-foreground [&>svg]:size-full',
          className,
        )}
        {...props}
        data-slot="pin-input-separator"
      >
        {children ?? <SeparatorMarkIcon />}
      </span>
    );
  },
);

function usePinInput(props: UsePinInputProps = {}) {
  return usePinInputPrimitive({ placeholder: '', ...props });
}

const PinInputContext = PinInputPrimitive.Context;
const PinInputHiddenInput = PinInputPrimitive.HiddenInput;

export {
  PinInput,
  PinInputContext,
  PinInputControl,
  PinInputHiddenInput,
  PinInputInput,
  PinInputInputs,
  PinInputLabel,
  PinInputRootProvider,
  PinInputSeparator,
  usePinInput,
  usePinInputContext,
};
export type {
  PinInputContextProps,
  PinInputControlProps,
  PinInputHiddenInputProps,
  PinInputInputProps,
  PinInputLabelProps,
  PinInputValueChangeDetails,
  PinInputValueInvalidDetails,
  UsePinInputContext,
  UsePinInputProps,
  UsePinInputReturn,
} from '@ark-ui/react/pin-input';

export type { PinInputRootProps, PinInputRootProviderProps, PinInputSize };