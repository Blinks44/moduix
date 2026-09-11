import {
  PinInput as PinInputPrimitive,
  usePinInput as usePinInputPrimitive,
  usePinInputContext,
  type UsePinInputProps,
  type UsePinInputReturn,
} from '@ark-ui/solid/pin-input';
import { children, For, splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui/Icons';

function PinInputRoot(props: ComponentProps<typeof PinInputPrimitive.Root>) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'count',
    'placeholder',
  ]);

  return (
    <PinInputPrimitive.Root
      asChild={local.asChild}
      count={local.count}
      placeholder={local.placeholder ?? ''}
      data-slot="pin-input-root"
      class={cn(
        'inline-flex w-auto max-w-none flex-col items-start gap-2 data-disabled:opacity-50',
        local.class,
      )}
      {...others}
    >
      {local.children}
    </PinInputPrimitive.Root>
  );
}

function PinInputRootProvider(props: ComponentProps<typeof PinInputPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <PinInputPrimitive.RootProvider
      asChild={local.asChild}
      data-slot="pin-input-root-provider"
      class={cn(
        'inline-flex w-auto max-w-none flex-col items-start gap-2 data-disabled:opacity-50',
        local.class,
      )}
      {...others}
    >
      {local.children}
    </PinInputPrimitive.RootProvider>
  );
}

function PinInputLabel(props: ComponentProps<typeof PinInputPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PinInputPrimitive.Label
      data-slot="pin-input-label"
      class={cn('text-sm leading-5 font-medium text-foreground', local.class)}
      {...others}
    />
  );
}

function PinInputControl(props: ComponentProps<typeof PinInputPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PinInputPrimitive.Control
      data-slot="pin-input-control"
      class={cn('inline-flex items-center gap-2', local.class)}
      {...others}
    />
  );
}

function PinInputInput(props: ComponentProps<typeof PinInputPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PinInputPrimitive.Input
      data-slot="pin-input-input"
      class={cn(
        'size-control-md flex-none rounded-md border border-border bg-background px-0 py-0 text-center text-lg leading-7 font-medium text-foreground tabular-nums outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color] duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none data-disabled:pointer-events-none data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        local.class,
      )}
      {...others}
    />
  );
}

function PinInputInputs(props: { class?: string }) {
  const pinInput = usePinInputContext();

  return (
    <For each={pinInput().items}>
      {(index) => <PinInputInput index={index} class={props.class} />}
    </For>
  );
}

function PinInputSeparator(props: ComponentProps<'span'>) {
  const [local, others] = splitProps(props, ['aria-hidden', 'children', 'class', 'role']);
  const resolvedChildren = children(() => local.children);

  return (
    <span
      data-slot="pin-input-separator"
      aria-hidden={local['aria-hidden'] ?? true}
      role={local.role ?? 'presentation'}
      class={cn(
        'pointer-events-none inline-flex size-4 flex-none items-center justify-center leading-none text-muted-foreground [&>svg]:size-full [&>svg]:flex-none',
        local.class,
      )}
      {...others}
    >
      {resolvedChildren() ?? <SeparatorMarkIcon />}
    </span>
  );
}

function usePinInput(props: UsePinInputProps | (() => UsePinInputProps) = {}): UsePinInputReturn {
  return usePinInputPrimitive(() => ({
    placeholder: '',
    ...(typeof props === 'function' ? props() : props),
  }));
}

const PinInput = Object.assign(PinInputRoot, {
  Root: PinInputRoot,
  RootProvider: PinInputRootProvider,
  Context: PinInputPrimitive.Context,
  HiddenInput: PinInputPrimitive.HiddenInput,
  Label: PinInputLabel,
  Control: PinInputControl,
  Input: PinInputInput,
  Inputs: PinInputInputs,
  Separator: PinInputSeparator,
});

export { PinInput, usePinInput, usePinInputContext };