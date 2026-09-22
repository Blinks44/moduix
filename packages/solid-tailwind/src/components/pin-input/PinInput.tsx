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

function PinInput(props: ComponentProps<typeof PinInputPrimitive.Root>) {
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
      class={cn(
        'inline-flex w-auto max-w-none flex-col items-start gap-2 data-disabled:opacity-50',
        local.class,
      )}
      {...others}
      data-slot="pin-input-root"
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
      class={cn(
        'inline-flex w-auto max-w-none flex-col items-start gap-2 data-disabled:opacity-50',
        local.class,
      )}
      {...others}
      data-slot="pin-input-root-provider"
    >
      {local.children}
    </PinInputPrimitive.RootProvider>
  );
}

function PinInputLabel(props: ComponentProps<typeof PinInputPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PinInputPrimitive.Label
      class={cn('text-sm font-medium text-foreground', local.class)}
      {...others}
      data-slot="pin-input-label"
    />
  );
}

function PinInputControl(props: ComponentProps<typeof PinInputPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PinInputPrimitive.Control
      class={cn('inline-flex items-center gap-2', local.class)}
      {...others}
      data-slot="pin-input-control"
    />
  );
}

function PinInputInput(props: ComponentProps<typeof PinInputPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PinInputPrimitive.Input
      class={cn(
        'size-control-md flex-none rounded-md border border-border bg-background px-0 py-0 text-center text-lg font-medium text-foreground tabular-nums outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color] duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none data-disabled:pointer-events-none data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        local.class,
      )}
      {...others}
      data-slot="pin-input-input"
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
      aria-hidden={local['aria-hidden'] ?? true}
      role={local.role ?? 'presentation'}
      class={cn(
        'pointer-events-none inline-flex size-4 flex-none items-center justify-center leading-none text-muted-foreground [&>svg]:size-full [&>svg]:flex-none',
        local.class,
      )}
      {...others}
      data-slot="pin-input-separator"
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

const PinInputContext = PinInputPrimitive.Context;
const PinInputHiddenInput = PinInputPrimitive.HiddenInput;

export {
  PinInput,
  PinInputContext,
  PinInputControl,
  PinInputHiddenInput,
  PinInputInput,
  PinInputInputs,
  PinInputLabel,
  PinInputRootProvider,
  PinInputSeparator,
  usePinInput,
  usePinInputContext,
};
