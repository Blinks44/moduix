import type { ComponentProps, ComponentRef } from 'react';
import {
  SignaturePad as SignaturePadPrimitive,
  useSignaturePad,
  useSignaturePadContext,
} from '@ark-ui/react/signature-pad';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './SignaturePad.module.css';

const SignaturePadRoot = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.Root>,
  ComponentProps<typeof SignaturePadPrimitive.Root>
>(function SignaturePadRoot({ className, ...props }, ref) {
  return (
    <SignaturePadPrimitive.Root
      ref={ref}
      data-slot="signature-pad-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const SignaturePadRootProvider = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.RootProvider>,
  ComponentProps<typeof SignaturePadPrimitive.RootProvider>
>(function SignaturePadRootProvider({ className, ...props }, ref) {
  return (
    <SignaturePadPrimitive.RootProvider
      ref={ref}
      data-slot="signature-pad-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
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
      className={clsx(styles.label, normalizeClassName(className))}
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
      className={clsx(styles.control, normalizeClassName(className))}
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
      className={clsx(styles.segment, normalizeClassName(className))}
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
      className={clsx(styles.guide, normalizeClassName(className))}
      {...props}
    />
  );
});

const SignaturePadClearTrigger = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.ClearTrigger>,
  ComponentProps<typeof SignaturePadPrimitive.ClearTrigger>
>(function SignaturePadClearTrigger({ className, ...props }, ref) {
  return (
    <SignaturePadPrimitive.ClearTrigger
      ref={ref}
      data-slot="signature-pad-clear-trigger"
      className={clsx(styles.clearTrigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const SignaturePadHiddenInput = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.HiddenInput>,
  ComponentProps<typeof SignaturePadPrimitive.HiddenInput>
>(function SignaturePadHiddenInput(props, ref) {
  return (
    <SignaturePadPrimitive.HiddenInput
      ref={ref}
      data-slot="signature-pad-hidden-input"
      {...props}
    />
  );
});

const SignaturePadContext = SignaturePadPrimitive.Context;

const SignaturePad = Object.assign(SignaturePadRoot, {
  Root: SignaturePadRoot,
  RootProvider: SignaturePadRootProvider,
  Label: SignaturePadLabel,
  Control: SignaturePadControl,
  Segment: SignaturePadSegment,
  Guide: SignaturePadGuide,
  ClearTrigger: SignaturePadClearTrigger,
  HiddenInput: SignaturePadHiddenInput,
  Context: SignaturePadContext,
});

export { SignaturePad, useSignaturePad, useSignaturePadContext };
export type {
  SignaturePadClearTriggerBaseProps,
  SignaturePadClearTriggerProps,
  SignaturePadContextProps,
  SignaturePadControlBaseProps,
  SignaturePadControlProps,
  SignaturePadDrawDetails,
  SignaturePadDrawEndDetails,
  SignaturePadDrawingOptions,
  SignaturePadGuideBaseProps,
  SignaturePadGuideProps,
  SignaturePadHiddenInputBaseProps,
  SignaturePadHiddenInputProps,
  SignaturePadLabelBaseProps,
  SignaturePadLabelProps,
  SignaturePadRootBaseProps,
  SignaturePadRootProps,
  SignaturePadRootProviderBaseProps,
  SignaturePadRootProviderProps,
  SignaturePadSegmentBaseProps,
  SignaturePadSegmentProps,
  UseSignaturePadContext,
  UseSignaturePadProps,
  UseSignaturePadReturn,
} from '@ark-ui/react/signature-pad';