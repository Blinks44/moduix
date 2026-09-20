import { useFieldContext } from '@ark-ui/solid/field';
import {
  SignaturePad as SignaturePadPrimitive,
  useSignaturePad as useSignaturePadPrimitive,
  useSignaturePadContext,
} from '@ark-ui/solid/signature-pad';
import type { Accessor, ComponentProps } from 'solid-js';
import { children, createContext, splitProps, useContext } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { RotateCcwIcon } from '@/lib/moduix/icons/ui/Icons';
import { CloseButton } from '../close-button';

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
      class={cn(
        'box-border inline-flex w-70 max-w-full flex-col gap-2 text-foreground data-disabled:opacity-50',
        local.class,
      )}
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
        class={cn(
          'box-border inline-flex w-70 max-w-full flex-col gap-2 text-foreground data-disabled:opacity-50',
          local.class,
        )}
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
      class={cn('text-sm leading-5 font-medium text-foreground select-none', local.class)}
      {...others}
      data-slot="signature-pad-label"
    />
  );
}

function SignaturePadControl(props: ComponentProps<typeof SignaturePadPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SignaturePadPrimitive.Control
      class={cn(
        'box-border h-40 min-h-40 w-full min-w-0 overflow-hidden rounded-md border border-border bg-background text-foreground shadow-sm transition-[border-color,box-shadow,opacity] duration-200 ease-in-out outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring data-disabled:cursor-not-allowed motion-reduce:transition-none',
        local.class,
      )}
      {...others}
      data-slot="signature-pad-control"
    />
  );
}

function SignaturePadSegment(props: ComponentProps<typeof SignaturePadPrimitive.Segment>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SignaturePadPrimitive.Segment
      class={cn('fill-current', local.class)}
      {...others}
      data-slot="signature-pad-segment"
    />
  );
}

function SignaturePadGuide(props: ComponentProps<typeof SignaturePadPrimitive.Guide>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <SignaturePadPrimitive.Guide
      class={cn(
        'pointer-events-none absolute start-6 end-6 bottom-8 border-b border-dashed border-border',
        local.class,
      )}
      {...others}
      data-slot="signature-pad-guide"
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
  const triggerClass = cn('absolute end-2 top-2 border-0', local.class);

  if (local.asChild) {
    return (
      <SignaturePadPrimitive.ClearTrigger
        asChild={local.asChild}
        aria-label={local['aria-label']}
        aria-labelledby={local['aria-labelledby']}
        class={triggerClass}
        {...others}
        data-slot="signature-pad-clear-trigger"
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

        return (
          <CloseButton.Root
            {...resolvedProps}
            aria-label={local['aria-label']}
            aria-labelledby={local['aria-labelledby']}
            class={cn(
              resolvedProps.class,
              'size-control-md rounded-sm bg-transparent text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-foreground',
              local.class,
            )}
          >
            {resolvedChildren() ?? <RotateCcwIcon class="size-4" aria-hidden="true" />}
          </CloseButton.Root>
        );
      }}
      class={triggerClass}
      {...others}
      data-slot="signature-pad-clear-trigger"
      disabled={isDisabled()}
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
      <SignaturePadClearTrigger>
        <RotateCcwIcon class="size-4" aria-hidden="true" />
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