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

const PinInput = forwardRef<
  ComponentRef<typeof PinInputPrimitive.Root>,
  ComponentProps<typeof PinInputPrimitive.Root>
>(function PinInput({ className, count, placeholder = '', ...props }, ref) {
  return (
    <PinInputPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      count={count}
      placeholder={placeholder}
      {...props}
      data-slot="pin-input-root"
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
      className={clsx(styles.root, className)}
      {...props}
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

function PinInputSeparator({
  className,
  'aria-hidden': ariaHidden = true,
  role = 'presentation',
  children,
  ...props
}: ComponentProps<'span'>) {
  return (
    <span
      aria-hidden={ariaHidden}
      role={role}
      className={clsx(styles.separator, className)}
      {...props}
      data-slot="pin-input-separator"
    >
      {children ?? <SeparatorMarkIcon />}
    </span>
  );
}

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
