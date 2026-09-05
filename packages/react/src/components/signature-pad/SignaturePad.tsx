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
const signaturePadReadOnly = Symbol();
type SignaturePadApi = ReturnType<typeof useSignaturePadPrimitive> & {
  [signaturePadReadOnly]: boolean;
};

const SignaturePadRoot = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.Root>,
  ComponentProps<typeof SignaturePadPrimitive.Root>
>(function SignaturePadRoot({ asChild, children, className, ...props }, ref) {
  const field = useFieldContext();
  const readOnly = props.readOnly ?? field?.readOnly ?? false;

  return (
    <SignaturePadReadOnlyContext.Provider value={readOnly}>
      <SignaturePadPrimitive.Root
        ref={ref}
        data-slot="signature-pad-root"
        className={clsx(styles.root, className)}
        asChild={asChild}
        {...props}
      >
        {children}
      </SignaturePadPrimitive.Root>
    </SignaturePadReadOnlyContext.Provider>
  );
});

const SignaturePadRootProvider = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.RootProvider>,
  ComponentProps<typeof SignaturePadPrimitive.RootProvider>
>(function SignaturePadRootProvider({ asChild, children, className, ...props }, ref) {
  const readOnly = (props.value as SignaturePadApi)[signaturePadReadOnly] ?? false;

  return (
    <SignaturePadReadOnlyContext.Provider value={readOnly}>
      <SignaturePadPrimitive.RootProvider
        ref={ref}
        data-slot="signature-pad-root-provider"
        className={clsx(styles.root, className)}
        asChild={asChild}
        {...props}
      >
        {children}
      </SignaturePadPrimitive.RootProvider>
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
      data-slot="signature-pad-label"
      className={clsx(styles.label, className)}
      {...props}
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
      data-slot="signature-pad-control"
      className={clsx(styles.control, className)}
      {...props}
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
      data-slot="signature-pad-segment"
      className={clsx(styles.segment, className)}
      {...props}
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
      data-slot="signature-pad-guide"
      className={clsx(styles.guide, className)}
      {...props}
    />
  );
});

const SignaturePadClearTrigger = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.ClearTrigger>,
  ComponentProps<typeof SignaturePadPrimitive.ClearTrigger>
>(function SignaturePadClearTrigger(
  {
    asChild,
    className,
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  },
  ref,
) {
  const readOnly = useContext(SignaturePadReadOnlyContext);
  const triggerClassName = clsx(styles.clearTrigger, className);

  return (
    <SignaturePadPrimitive.ClearTrigger
      ref={ref}
      asChild
      data-slot="signature-pad-clear-trigger"
      className={triggerClassName}
      aria-label={asChild ? ariaLabel : undefined}
      aria-labelledby={asChild ? ariaLabelledBy : undefined}
      {...props}
      disabled={readOnly || props.disabled}
    >
      {asChild ? (
        children
      ) : (
        <CloseButton.Root aria-label={ariaLabel} aria-labelledby={ariaLabelledBy}>
          {children ?? <RotateCcwIcon aria-hidden="true" />}
        </CloseButton.Root>
      )}
    </SignaturePadPrimitive.ClearTrigger>
  );
});

const SignaturePadCanvas = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.Control>,
  Omit<ComponentProps<typeof SignaturePadPrimitive.Control>, 'children'>
>(function SignaturePadCanvas({ className, ...props }, ref) {
  return (
    <SignaturePadControl ref={ref} className={className} {...props}>
      <SignaturePadSegment />
      <SignaturePadClearTrigger>
        <RotateCcwIcon aria-hidden="true" />
      </SignaturePadClearTrigger>
      <SignaturePadGuide />
    </SignaturePadControl>
  );
});

function useSignaturePad(
  props?: Parameters<typeof useSignaturePadPrimitive>[0],
): ReturnType<typeof useSignaturePadPrimitive> {
  const field = useFieldContext();
  const signaturePad = useSignaturePadPrimitive(props);
  const api: SignaturePadApi = {
    ...signaturePad,
    [signaturePadReadOnly]: props?.readOnly ?? field?.readOnly ?? false,
  };

  return api;
}

const SignaturePad = Object.assign(SignaturePadRoot, {
  Root: SignaturePadRoot,
  RootProvider: SignaturePadRootProvider,
  Context: SignaturePadPrimitive.Context,
  HiddenInput: SignaturePadPrimitive.HiddenInput,
  Label: SignaturePadLabel,
  Control: SignaturePadControl,
  Canvas: SignaturePadCanvas,
  Segment: SignaturePadSegment,
  Guide: SignaturePadGuide,
  ClearTrigger: SignaturePadClearTrigger,
});

export { SignaturePad, useSignaturePad, useSignaturePadContext };