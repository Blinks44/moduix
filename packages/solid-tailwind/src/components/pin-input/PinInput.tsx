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
import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui';

type PinInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type PinInputRootProps = ComponentProps<typeof PinInputPrimitive.Root> & {
  size?: PinInputSize;
};
type PinInputRootProviderProps = ComponentProps<typeof PinInputPrimitive.RootProvider> & {
  size?: PinInputSize;
};

const rootClass =
  'group/pin-input inline-flex flex-col items-start gap-2 text-foreground data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

function PinInput(props: PinInputRootProps) {
  const [local, others] = splitProps(props, ['class', 'placeholder', 'size']);

  return (
    <PinInputPrimitive.Root
      placeholder={local.placeholder ?? ''}
      class={cn(rootClass, local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="pin-input-root"
    />
  );
}

function PinInputRootProvider(props: PinInputRootProviderProps) {
  const [local, others] = splitProps(props, ['class', 'size']);

  return (
    <PinInputPrimitive.RootProvider
      class={cn(rootClass, local.class)}
      {...others}
      data-size={local.size ?? 'md'}
      data-slot="pin-input-root-provider"
    />
  );
}

function PinInputLabel(props: ComponentProps<typeof PinInputPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PinInputPrimitive.Label
      class={cn('text-sm font-medium', local.class)}
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
        'size-control-md flex-none rounded-md border border-border bg-background p-0 text-center text-lg font-medium text-inherit tabular-nums outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out group-data-[size=lg]/pin-input:size-control-lg group-data-[size=lg]/pin-input:text-xl group-data-[size=sm]/pin-input:size-control-sm group-data-[size=sm]/pin-input:text-md group-data-[size=xl]/pin-input:size-control-xl group-data-[size=xl]/pin-input:text-2xl group-data-[size=xs]/pin-input:size-control-xs group-data-[size=xs]/pin-input:text-sm placeholder:text-muted-foreground focus-visible:outline-ring data-invalid:border-destructive data-invalid:focus-visible:outline-destructive',
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
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <span
      aria-hidden="true"
      class={cn(
        'inline-flex size-4 flex-none text-muted-foreground [&>svg]:size-full',
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
export type {
  PinInputContextProps,
  PinInputControlProps,
  PinInputHiddenInputProps,
  PinInputInputProps,
  PinInputLabelProps,
  PinInputValueChangeDetails,
  PinInputValueInvalidDetails,
  UsePinInputContext,
  UsePinInputProps,
  UsePinInputReturn,
} from '@ark-ui/solid/pin-input';

export type { PinInputRootProps, PinInputRootProviderProps, PinInputSize };