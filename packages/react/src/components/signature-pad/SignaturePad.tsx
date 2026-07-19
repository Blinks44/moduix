import {
  SignaturePad as SignaturePadPrimitive,
  useSignaturePad,
  useSignaturePadContext,
} from '@ark-ui/react/signature-pad';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ReactElement, ReactNode } from 'react';
import { Children, cloneElement, forwardRef } from 'react';
import { RotateCcwIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import { CloseButton } from '../close-button';
import styles from './SignaturePad.module.css';

const SignaturePadRoot = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.Root>,
  ComponentProps<typeof SignaturePadPrimitive.Root> & SignaturePadFormProps
>(function SignaturePadRoot({ asChild, children, className, getFormValue, ...props }, ref) {
  return (
    <SignaturePadPrimitive.Root
      ref={ref}
      data-slot="signature-pad-root"
      className={clsx(styles.root, normalizeClassName(className))}
      asChild={asChild}
      {...props}
    >
      {withHiddenInput(children, asChild, getFormValue)}
    </SignaturePadPrimitive.Root>
  );
});

const SignaturePadRootProvider = forwardRef<
  ComponentRef<typeof SignaturePadPrimitive.RootProvider>,
  ComponentProps<typeof SignaturePadPrimitive.RootProvider> & SignaturePadFormProps
>(function SignaturePadRootProvider({ asChild, children, className, getFormValue, ...props }, ref) {
  return (
    <SignaturePadPrimitive.RootProvider
      ref={ref}
      data-slot="signature-pad-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      asChild={asChild}
      {...props}
    >
      {withHiddenInput(children, asChild, getFormValue)}
    </SignaturePadPrimitive.RootProvider>
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
  const triggerClassName = clsx(styles.clearTrigger, normalizeClassName(className));

  if (asChild) {
    return (
      <SignaturePadPrimitive.ClearTrigger
        ref={ref}
        asChild
        data-slot="signature-pad-clear-trigger"
        className={triggerClassName}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...props}
      >
        {children}
      </SignaturePadPrimitive.ClearTrigger>
    );
  }

  return (
    <SignaturePadPrimitive.ClearTrigger
      ref={ref}
      asChild
      data-slot="signature-pad-clear-trigger"
      className={triggerClassName}
      {...props}
    >
      <CloseButton.Root aria-label={ariaLabel} aria-labelledby={ariaLabelledBy}>
        {children ?? <RotateCcwIcon aria-hidden="true" />}
      </CloseButton.Root>
    </SignaturePadPrimitive.ClearTrigger>
  );
});

type SignaturePadFormProps = {
  getFormValue?: (paths: string[]) => string;
};

function withHiddenInput(
  children: ReactNode,
  asChild: boolean | undefined,
  getFormValue: SignaturePadFormProps['getFormValue'],
) {
  const hiddenInput = <SignaturePadFormInput getFormValue={getFormValue} />;

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

function SignaturePadFormInput({ getFormValue }: SignaturePadFormProps) {
  const signaturePad = useSignaturePadContext();

  return (
    <SignaturePadPrimitive.HiddenInput
      data-slot="signature-pad-hidden-input"
      value={getFormValue?.(signaturePad.paths) ?? signaturePad.paths.join(' ')}
    />
  );
}

function SignaturePadCanvas({ className }: { className?: string }) {
  return (
    <SignaturePadControl className={className}>
      <SignaturePadSegment />
      <SignaturePadClearTrigger>
        <RotateCcwIcon aria-hidden="true" />
      </SignaturePadClearTrigger>
      <SignaturePadGuide />
    </SignaturePadControl>
  );
}

const SignaturePad = Object.assign(SignaturePadRoot, {
  Root: SignaturePadRoot,
  RootProvider: SignaturePadRootProvider,
  Label: SignaturePadLabel,
  Control: SignaturePadControl,
  Canvas: SignaturePadCanvas,
  Segment: SignaturePadSegment,
  Guide: SignaturePadGuide,
  ClearTrigger: SignaturePadClearTrigger,
});

export { SignaturePad, useSignaturePad, useSignaturePadContext };