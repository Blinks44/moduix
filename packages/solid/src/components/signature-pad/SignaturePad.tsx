import { useFieldContext } from '@ark-ui/solid/field';
import {
  SignaturePad as SignaturePadPrimitive,
  useSignaturePad as useSignaturePadPrimitive,
  useSignaturePadContext,
} from '@ark-ui/solid/signature-pad';
import { clsx } from 'clsx';
import type { Accessor, ComponentProps } from 'solid-js';
import { createContext, splitProps, useContext } from 'solid-js';
import { RotateCcwIcon } from '@/lib/moduix/icons/ui';
import { CloseButton } from '../close-button';
import styles from './SignaturePad.module.css';

const SignaturePadReadOnlyContext = createContext<Accessor<boolean>>(() => false);

type SignaturePadApi = ReturnType<typeof useSignaturePadPrimitive> & {
  readOnly: Accessor<boolean>;
};
type SignaturePadRootProviderProps = Omit<
  ComponentProps<typeof SignaturePadPrimitive.RootProvider>,
  'value'
> & { value: ReturnType<typeof useSignaturePadPrimitive> & { readOnly?: Accessor<boolean> } };
type SignaturePadHookProps = Parameters<typeof useSignaturePadPrimitive>[0];

function SignaturePad(props: ComponentProps<typeof SignaturePadPrimitive.Root>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const field = useFieldContext();

  return (
    <SignaturePadPrimitive.Root
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="signature-pad-root"
    >
      <SignaturePadReadOnlyContext.Provider
        value={() => others.readOnly ?? field?.().readOnly ?? false}
      >
        {local.children}
      </SignaturePadReadOnlyContext.Provider>
    </SignaturePadPrimitive.Root>
  );
}

function SignaturePadRootProvider(props: SignaturePadRootProviderProps) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <SignaturePadReadOnlyContext.Provider value={() => props.value.readOnly?.() ?? false}>
      <SignaturePadPrimitive.RootProvider
        class={clsx(styles.root, local.class)}
        {...others}
        data-slot="signature-pad-root-provider"
      >
        {local.children}
      </SignaturePadPrimitive.RootProvider>
    </SignaturePadReadOnlyContext.Provider>
  );
}

function SignaturePadLabel(props: ComponentProps<typeof SignaturePadPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SignaturePadPrimitive.Label
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="signature-pad-label"
    />
  );
}

function SignaturePadControl(props: ComponentProps<typeof SignaturePadPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SignaturePadPrimitive.Control
      class={clsx(styles.control, local.class)}
      {...others}
      data-slot="signature-pad-control"
    />
  );
}

function SignaturePadSegment(props: ComponentProps<typeof SignaturePadPrimitive.Segment>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SignaturePadPrimitive.Segment
      class={clsx(styles.segment, local.class)}
      {...others}
      data-slot="signature-pad-segment"
    />
  );
}

function SignaturePadGuide(props: ComponentProps<typeof SignaturePadPrimitive.Guide>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SignaturePadPrimitive.Guide
      class={clsx(styles.guide, local.class)}
      {...others}
      data-slot="signature-pad-guide"
    />
  );
}

function SignaturePadClearTrigger(
  props: ComponentProps<typeof SignaturePadPrimitive.ClearTrigger>,
) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const readOnly = useContext(SignaturePadReadOnlyContext);

  // Ark still clears read-only signatures, so moduix hides the action as it does while empty.
  return (
    <SignaturePadPrimitive.ClearTrigger
      asChild={
        local.asChild ??
        ((triggerProps) => (
          <CloseButton {...triggerProps()}>
            {local.children ?? <RotateCcwIcon aria-hidden="true" />}
          </CloseButton>
        ))
      }
      class={clsx(styles.clearTrigger, local.class)}
      {...others}
      data-slot="signature-pad-clear-trigger"
      hidden={readOnly() || undefined}
    />
  );
}

type SignaturePadCanvasProps = Omit<
  ComponentProps<typeof SignaturePadPrimitive.Control>,
  'asChild' | 'children'
>;

function SignaturePadCanvas(props: SignaturePadCanvasProps) {
  return (
    <SignaturePadControl {...props}>
      <SignaturePadSegment />
      <SignaturePadClearTrigger />
      <SignaturePadGuide />
    </SignaturePadControl>
  );
}

function useSignaturePad(props?: SignaturePadHookProps): SignaturePadApi {
  const field = useFieldContext();
  const signaturePad = useSignaturePadPrimitive(props);
  return Object.assign(signaturePad, {
    readOnly: () => {
      const machineProps = typeof props === 'function' ? props() : props;
      return machineProps?.readOnly ?? field?.().readOnly ?? false;
    },
  });
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