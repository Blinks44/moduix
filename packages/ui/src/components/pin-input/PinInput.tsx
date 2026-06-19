import type { ComponentProps, ComponentRef } from 'react';
import {
  PinInput as PinInputPrimitive,
  usePinInput as usePinInputPrimitive,
  usePinInputContext,
  type UsePinInputProps,
} from '@ark-ui/react/pin-input';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './PinInput.module.css';

const PinInputRoot = forwardRef<
  ComponentRef<typeof PinInputPrimitive.Root>,
  ComponentProps<typeof PinInputPrimitive.Root>
>(function PinInputRoot({ children, className, count, placeholder = '', ...props }, ref) {
  return (
    <PinInputPrimitive.Root
      ref={ref}
      data-slot="pin-input-root"
      className={clsx(styles.root, normalizeClassName(className))}
      count={count}
      placeholder={placeholder}
      {...props}
    >
      {children ??
        (typeof count === 'number' ? (
          <>
            <PinInputControl>
              {Array.from({ length: count }, (_, index) => (
                <PinInputInput key={index} index={index} />
              ))}
            </PinInputControl>
            <PinInputHiddenInput />
          </>
        ) : null)}
    </PinInputPrimitive.Root>
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
      className={clsx(styles.root, normalizeClassName(className))}
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
      className={clsx(styles.label, normalizeClassName(className))}
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
      className={clsx(styles.control, normalizeClassName(className))}
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
      className={clsx(styles.input, normalizeClassName(className))}
      {...props}
    />
  );
});

const PinInputHiddenInput = forwardRef<
  ComponentRef<typeof PinInputPrimitive.HiddenInput>,
  ComponentProps<typeof PinInputPrimitive.HiddenInput>
>(function PinInputHiddenInput(props, ref) {
  return <PinInputPrimitive.HiddenInput ref={ref} data-slot="pin-input-hidden-input" {...props} />;
});

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
      className={clsx(styles.separator, normalizeClassName(className))}
      {...props}
    >
      {children ?? <SeparatorMarkIcon />}
    </span>
  );
}

const PinInputContext = PinInputPrimitive.Context;

function usePinInput(props: UsePinInputProps = {}) {
  return usePinInputPrimitive({ placeholder: '', ...props });
}

const PinInput = Object.assign(PinInputRoot, {
  Root: PinInputRoot,
  RootProvider: PinInputRootProvider,
  Label: PinInputLabel,
  Control: PinInputControl,
  Input: PinInputInput,
  HiddenInput: PinInputHiddenInput,
  Separator: PinInputSeparator,
  Context: PinInputContext,
});

export { PinInput, usePinInput, usePinInputContext };
export type {
  PinInputValueChangeDetails,
  PinInputValueInvalidDetails,
  UsePinInputContext,
  UsePinInputProps,
  UsePinInputReturn,
} from '@ark-ui/react/pin-input';