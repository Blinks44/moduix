'use client';

import { useFieldContext } from '@ark-ui/react/field';
import {
  SignaturePad as SignaturePadPrimitive,
  useSignaturePad as useSignaturePadPrimitive,
  useSignaturePadContext,
} from '@ark-ui/react/signature-pad';
import type { ComponentProps, ComponentRef } from 'react';
import { createContext, forwardRef, useContext } from 'react';
import { cn } from '@/lib/moduix/cn';
import { RotateCcwIcon } from '@/lib/moduix/icons/ui';
import { CloseButton } from '../close-button';

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
        className={cn(
          'box-border inline-flex w-70 max-w-full flex-col gap-2 text-foreground data-disabled:opacity-50',
          className,
        )}
        asChild={asChild}
        {...props}
        data-slot="signature-pad-root"
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
        className={cn(
          'box-border inline-flex w-70 max-w-full flex-col gap-2 text-foreground data-disabled:opacity-50',
          className,
        )}
        asChild={asChild}
        {...props}
        data-slot="signature-pad-root-provider"
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
      className={cn('text-sm leading-5 font-medium text-foreground select-none', className)}
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
      className={cn(
        'box-border h-40 min-h-40 w-full min-w-0 overflow-hidden rounded-md border border-border bg-background text-foreground shadow-sm transition-[border-color,box-shadow,opacity] duration-200 ease-in-out outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring data-disabled:cursor-not-allowed motion-reduce:transition-none',
        className,
      )}
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
      className={cn('fill-current', className)}
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
      className={cn(
        'pointer-events-none absolute start-6 end-6 bottom-8 border-b border-dashed border-border',
        className,
      )}
      {...props}
      data-slot="signature-pad-guide"
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
  const triggerClassName = cn('absolute end-2 top-2 border-0', className);

  return (
    <SignaturePadPrimitive.ClearTrigger
      ref={ref}
      asChild
      className={triggerClassName}
      aria-label={asChild ? ariaLabel : undefined}
      aria-labelledby={asChild ? ariaLabelledBy : undefined}
      {...props}
      data-slot="signature-pad-clear-trigger"
      disabled={readOnly || props.disabled}
    >
      {asChild ? (
        children
      ) : (
        <CloseButton.Root
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={cn(
            'size-7 rounded-sm bg-transparent text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-foreground',
            className,
          )}
        >
          {children ?? <RotateCcwIcon className="size-4" aria-hidden="true" />}
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
        <RotateCcwIcon className="size-4" aria-hidden="true" />
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