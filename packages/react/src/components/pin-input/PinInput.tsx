'use client';

import {
  PinInput as PinInputPrimitive,
  usePinInput as usePinInputPrimitive,
  usePinInputContext,
  type UsePinInputProps,
} from '@ark-ui/react/pin-input';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui';
import styles from './PinInput.module.css';

type PinInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type PinInputRootProps = ComponentProps<typeof PinInputPrimitive.Root> & {
  size?: PinInputSize;
};
type PinInputRootProviderProps = ComponentProps<typeof PinInputPrimitive.RootProvider> & {
  size?: PinInputSize;
};

const PinInput = forwardRef<ComponentRef<typeof PinInputPrimitive.Root>, PinInputRootProps>(
  function PinInput({ className, placeholder = '', size = 'md', ...props }, ref) {
    return (
      <PinInputPrimitive.Root
        ref={ref}
        className={clsx(styles.root, className)}
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
      className={clsx(styles.root, className)}
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
      className={clsx(styles.label, className)}
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
      className={clsx(styles.control, className)}
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
      className={clsx(styles.input, className)}
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
        className={clsx(styles.separator, className)}
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