'use client';

import { useFieldContext } from '@ark-ui/react/field';
import {
  SignaturePad as SignaturePadPrimitive,
  useSignaturePad as useSignaturePadPrimitive,
  useSignaturePadContext,
} from '@ark-ui/react/signature-pad';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { createContext, forwardRef, useContext } from 'react';
import { RotateCcwIcon } from '@/lib/moduix/icons/ui';
import { CloseButton } from '../close-button';
import styles from './SignaturePad.module.css';

const SignaturePadReadOnlyContext = createContext(false);

type SignaturePadApi = ReturnType<typeof useSignaturePadPrimitive> & { readOnly: boolean };
type SignaturePadRootProviderProps = Omit<
  ComponentProps<typeof SignaturePadPrimitive.RootProvider>,
  'value'
> & { value: ReturnType<typeof useSignaturePadPrimitive> & { readOnly?: boolean } };

const SignaturePad = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.Root>,
  ComponentProps<typeof SignaturePadPrimitive.Root>
>(function SignaturePad({ className, ...props }, ref) {
  const field = useFieldContext();
  const readOnly = props.readOnly ?? field?.readOnly ?? false;

  return (
    <SignaturePadReadOnlyContext.Provider value={readOnly}>
      <SignaturePadPrimitive.Root
        ref={ref}
        className={clsx(styles.root, className)}
        {...props}
        data-slot="signature-pad-root"
      />
    </SignaturePadReadOnlyContext.Provider>
  );
});

const SignaturePadRootProvider = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.RootProvider>,
  SignaturePadRootProviderProps
>(function SignaturePadRootProvider({ className, ...props }, ref) {
  const readOnly = props.value.readOnly ?? false;

  return (
    <SignaturePadReadOnlyContext.Provider value={readOnly}>
      <SignaturePadPrimitive.RootProvider
        ref={ref}
        className={clsx(styles.root, className)}
        {...props}
        data-slot="signature-pad-root-provider"
      />
    </SignaturePadReadOnlyContext.Provider>
  );
});

const SignaturePadLabel = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.Label>,
  ComponentProps<typeof SignaturePadPrimitive.Label>
>(function SignaturePadLabel({ className, ...props }, ref) {
  return (
    <SignaturePadPrimitive.Label
      ref={ref}
      className={clsx(styles.label, className)}
      {...props}
      data-slot="signature-pad-label"
    />
  );
});

const SignaturePadControl = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.Control>,
  ComponentProps<typeof SignaturePadPrimitive.Control>
>(function SignaturePadControl({ className, ...props }, ref) {
  return (
    <SignaturePadPrimitive.Control
      ref={ref}
      className={clsx(styles.control, className)}
      {...props}
      data-slot="signature-pad-control"
    />
  );
});

const SignaturePadSegment = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.Segment>,
  ComponentProps<typeof SignaturePadPrimitive.Segment>
>(function SignaturePadSegment({ className, ...props }, ref) {
  return (
    <SignaturePadPrimitive.Segment
      ref={ref}
      className={clsx(styles.segment, className)}
      {...props}
      data-slot="signature-pad-segment"
    />
  );
});

const SignaturePadGuide = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.Guide>,
  ComponentProps<typeof SignaturePadPrimitive.Guide>
>(function SignaturePadGuide({ className, ...props }, ref) {
  return (
    <SignaturePadPrimitive.Guide
      ref={ref}
      className={clsx(styles.guide, className)}
      {...props}
      data-slot="signature-pad-guide"
    />
  );
});

const SignaturePadClearTrigger = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.ClearTrigger>,
  ComponentProps<typeof SignaturePadPrimitive.ClearTrigger>
>(function SignaturePadClearTrigger({ asChild, className, children, ...props }, ref) {
  const readOnly = useContext(SignaturePadReadOnlyContext);

  // Ark still clears read-only signatures, so moduix hides the action as it does while empty.
  return (
    <SignaturePadPrimitive.ClearTrigger
      ref={ref}
      asChild
      className={clsx(styles.clearTrigger, className)}
      {...props}
      data-slot="signature-pad-clear-trigger"
      hidden={readOnly || undefined}
    >
      {asChild ? (
        children
      ) : (
        <CloseButton>{children ?? <RotateCcwIcon aria-hidden="true" />}</CloseButton>
      )}
    </SignaturePadPrimitive.ClearTrigger>
  );
});

const SignaturePadCanvas = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.Control>,
  Omit<ComponentProps<typeof SignaturePadPrimitive.Control>, 'asChild' | 'children'>
>(function SignaturePadCanvas(props, ref) {
  return (
    <SignaturePadControl ref={ref} {...props}>
      <SignaturePadSegment />
      <SignaturePadClearTrigger />
      <SignaturePadGuide />
    </SignaturePadControl>
  );
});

function useSignaturePad(props?: Parameters<typeof useSignaturePadPrimitive>[0]): SignaturePadApi {
  const field = useFieldContext();
  const signaturePad = useSignaturePadPrimitive(props);

  return { ...signaturePad, readOnly: props?.readOnly ?? field?.readOnly ?? false };
}

const SignaturePadContext = SignaturePadPrimitive.Context;
const SignaturePadHiddenInput = SignaturePadPrimitive.HiddenInput;

export {
  SignaturePad,
  SignaturePadCanvas,
  SignaturePadClearTrigger,
  SignaturePadContext,
  SignaturePadControl,
  SignaturePadGuide,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  SignaturePadRootProvider,
  SignaturePadSegment,
  useSignaturePad,
  useSignaturePadContext,
};