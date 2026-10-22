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

const rootClassName =
  'box-border inline-flex w-70 max-w-full flex-col gap-2 text-foreground data-disabled:opacity-50';

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
        className={cn(rootClassName, className)}
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
        className={cn(rootClassName, className)}
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
      className={cn('text-sm leading-5 font-medium select-none', className)}
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
        'box-border h-40 w-full min-w-0 overflow-hidden rounded-md border border-border bg-background shadow-sm transition-[border-color,box-shadow] duration-normal ease-in-out outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring data-disabled:cursor-not-allowed',
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
        'pointer-events-none absolute inset-x-6 bottom-8 border-b border-dashed border-border',
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
>(function SignaturePadClearTrigger({ asChild, className, children, ...props }, ref) {
  const readOnly = useContext(SignaturePadReadOnlyContext);

  // Ark still clears read-only signatures, so moduix hides the action as it does while empty.
  return (
    <SignaturePadPrimitive.ClearTrigger
      ref={ref}
      asChild
      className={cn('absolute end-2 top-2 size-control-xs data-disabled:opacity-100', className)}
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