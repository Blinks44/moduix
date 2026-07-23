import {
  PinInput as PinInputPrimitive,
  usePinInput as usePinInputPrimitive,
  usePinInputContext,
  type UsePinInputProps,
} from '@ark-ui/react/pin-input';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ReactElement, ReactNode } from 'react';
import { Children, cloneElement, forwardRef } from 'react';
import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './PinInput.module.css';

const PinInputRoot = forwardRef<
  ComponentRef<typeof PinInputPrimitive.Root>,
  ComponentProps<typeof PinInputPrimitive.Root>
>(function PinInputRoot({ asChild, children, className, count, placeholder = '', ...props }, ref) {
  return (
    <PinInputPrimitive.Root
      ref={ref}
      asChild={asChild}
      data-slot="pin-input-root"
      className={clsx(styles.root, normalizeClassName(className))}
      count={count}
      placeholder={placeholder}
      {...props}
    >
      {withHiddenInput(children, asChild)}
    </PinInputPrimitive.Root>
  );
});

const PinInputRootProvider = forwardRef<
  ComponentRef<typeof PinInputPrimitive.RootProvider>,
  ComponentProps<typeof PinInputPrimitive.RootProvider>
>(function PinInputRootProvider({ asChild, children, className, ...props }, ref) {
  return (
    <PinInputPrimitive.RootProvider
      ref={ref}
      asChild={asChild}
      data-slot="pin-input-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    >
      {withHiddenInput(children, asChild)}
    </PinInputPrimitive.RootProvider>
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

function PinInputInputs({ className }: { className?: string }) {
  const { items } = usePinInputContext();

  return items.map((index) => <PinInputInput key={index} index={index} className={className} />);
}

function withHiddenInput(children: ReactNode, asChild?: boolean) {
  const hiddenInput = <PinInputPrimitive.HiddenInput data-slot="pin-input-hidden-input" />;

  if (!asChild) {
    return (
      <>
        {children}
        {hiddenInput}
      </>
    );
  }

  const child = Children.only(children) as ReactElement<{ children?: ReactNode }>;

  return cloneElement(child, {}, child.props.children, hiddenInput);
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
      className={clsx(styles.separator, normalizeClassName(className))}
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
  Label: PinInputLabel,
  Control: PinInputControl,
  Input: PinInputInput,
  Inputs: PinInputInputs,
  Separator: PinInputSeparator,
});

export { PinInput, usePinInput, usePinInputContext };