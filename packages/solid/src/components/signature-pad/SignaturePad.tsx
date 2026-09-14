import { useFieldContext } from '@ark-ui/solid/field';
import {
  SignaturePad as SignaturePadPrimitive,
  useSignaturePad as useSignaturePadPrimitive,
  useSignaturePadContext,
} from '@ark-ui/solid/signature-pad';
import { clsx } from 'clsx';
import type { Accessor, ComponentProps } from 'solid-js';
import { children, createContext, splitProps, useContext } from 'solid-js';
import { RotateCcwIcon } from '@/lib/moduix/icons/ui/Icons';
import { CloseButton } from '../close-button';
import styles from './SignaturePad.module.css';

const SignaturePadReadOnlyContext = createContext<Accessor<boolean>>(() => false);
const signaturePadReadOnly = Symbol();

type SignaturePadApi = ReturnType<typeof useSignaturePadPrimitive> & {
  [signaturePadReadOnly]: Accessor<boolean>;
};
type SignaturePadHookProps = Parameters<typeof useSignaturePadPrimitive>[0];
function SignaturePadRoot(props: ComponentProps<typeof SignaturePadPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const field = useFieldContext();

  return (
    <SignaturePadPrimitive.Root
      asChild={local.asChild}
      data-slot="signature-pad-root"
      class={clsx(styles.root, local.class)}
      {...others}
    >
      <SignaturePadReadOnlyContext.Provider
        value={() => others.readOnly ?? field?.().readOnly ?? false}
      >
        {local.children}
      </SignaturePadReadOnlyContext.Provider>
    </SignaturePadPrimitive.Root>
  );
}

function SignaturePadRootProvider(
  props: ComponentProps<typeof SignaturePadPrimitive.RootProvider>,
) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <SignaturePadReadOnlyContext.Provider
      value={() => {
        const signaturePad = others.value as Partial<SignaturePadApi>;

        return signaturePad[signaturePadReadOnly]?.() ?? false;
      }}
    >
      <SignaturePadPrimitive.RootProvider
        asChild={local.asChild}
        data-slot="signature-pad-root-provider"
        class={clsx(styles.root, local.class)}
        {...others}
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
      data-slot="signature-pad-label"
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

function SignaturePadControl(props: ComponentProps<typeof SignaturePadPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SignaturePadPrimitive.Control
      data-slot="signature-pad-control"
      class={clsx(styles.control, local.class)}
      {...others}
    />
  );
}

function SignaturePadSegment(props: ComponentProps<typeof SignaturePadPrimitive.Segment>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SignaturePadPrimitive.Segment
      data-slot="signature-pad-segment"
      class={clsx(styles.segment, local.class)}
      {...others}
    />
  );
}

function SignaturePadGuide(props: ComponentProps<typeof SignaturePadPrimitive.Guide>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SignaturePadPrimitive.Guide
      data-slot="signature-pad-guide"
      class={clsx(styles.guide, local.class)}
      {...others}
    />
  );
}

function SignaturePadClearTrigger(
  props: ComponentProps<typeof SignaturePadPrimitive.ClearTrigger>,
) {
  const [local, others] = splitProps(props, [
    'aria-label',
    'aria-labelledby',
    'asChild',
    'children',
    'class',
    'disabled',
  ]);
  const resolvedChildren = children(() => local.children);
  const readOnly = useContext(SignaturePadReadOnlyContext);
  const isDisabled = () => (readOnly() || local.disabled ? true : undefined);
  const triggerClass = clsx(styles.clearTrigger, local.class);

  if (local.asChild) {
    return (
      <SignaturePadPrimitive.ClearTrigger
        asChild={local.asChild}
        aria-label={local['aria-label']}
        aria-labelledby={local['aria-labelledby']}
        data-slot="signature-pad-clear-trigger"
        class={triggerClass}
        {...others}
        disabled={isDisabled()}
      >
        {local.children}
      </SignaturePadPrimitive.ClearTrigger>
    );
  }

  return (
    <SignaturePadPrimitive.ClearTrigger
      asChild={(triggerProps) => {
        const resolvedProps = triggerProps();
        const ariaLabel =
          local['aria-label'] ??
          (local['aria-labelledby'] == null ? resolvedProps['aria-label'] : undefined);

        return (
          <CloseButton.Root
            {...resolvedProps}
            aria-label={ariaLabel}
            aria-labelledby={local['aria-labelledby'] ?? resolvedProps['aria-labelledby']}
          >
            {resolvedChildren() ?? <RotateCcwIcon aria-hidden="true" />}
          </CloseButton.Root>
        );
      }}
      data-slot="signature-pad-clear-trigger"
      class={triggerClass}
      {...others}
      disabled={isDisabled()}
    />
  );
}

type SignaturePadCanvasProps = Omit<
  ComponentProps<typeof SignaturePadPrimitive.Control>,
  'children'
>;

function SignaturePadCanvas(props: SignaturePadCanvasProps) {
  return (
    <SignaturePadControl {...props}>
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
  Context: SignaturePadPrimitive.Context,
  HiddenInput: SignaturePadPrimitive.HiddenInput,
  Label: SignaturePadLabel,
  Control: SignaturePadControl,
  Canvas: SignaturePadCanvas,
  Segment: SignaturePadSegment,
  Guide: SignaturePadGuide,
  ClearTrigger: SignaturePadClearTrigger,
});

function useSignaturePad(props?: SignaturePadHookProps) {
  const field = useFieldContext();
  const signaturePad = useSignaturePadPrimitive(props);
  const api: SignaturePadApi = Object.assign(signaturePad, {
    [signaturePadReadOnly]: () => {
      const machineProps = typeof props === 'function' ? props() : props;

      return machineProps?.readOnly ?? field?.().readOnly ?? false;
    },
  });

  return api;
}

export { SignaturePad, useSignaturePad, useSignaturePadContext };