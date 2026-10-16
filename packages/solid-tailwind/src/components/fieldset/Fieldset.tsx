import {
  Fieldset as FieldsetPrimitive,
  useFieldset,
  useFieldsetContext,
} from '@ark-ui/solid/fieldset';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

const rootClass = 'flex w-full min-w-0 flex-col gap-4 data-disabled:opacity-50';

function Fieldset(props: ComponentProps<typeof FieldsetPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldsetPrimitive.Root
      {...others}
      data-slot="fieldset-root"
      class={cn(rootClass, local.class)}
    />
  );
}

function FieldsetRootProvider(props: ComponentProps<typeof FieldsetPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldsetPrimitive.RootProvider
      {...others}
      data-slot="fieldset-root-provider"
      class={cn(rootClass, local.class)}
    />
  );
}

function FieldsetLegend(props: ComponentProps<typeof FieldsetPrimitive.Legend>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldsetPrimitive.Legend
      {...others}
      data-slot="fieldset-legend"
      class={cn('max-w-full pb-3 text-lg font-semibold wrap-anywhere text-foreground', local.class)}
    />
  );
}

function FieldsetHelperText(props: ComponentProps<typeof FieldsetPrimitive.HelperText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldsetPrimitive.HelperText
      {...others}
      data-slot="fieldset-helper-text"
      class={cn('text-sm wrap-anywhere text-muted-foreground', local.class)}
    />
  );
}

function FieldsetErrorText(props: ComponentProps<typeof FieldsetPrimitive.ErrorText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldsetPrimitive.ErrorText
      {...others}
      data-slot="fieldset-error-text"
      class={cn('text-sm font-medium wrap-anywhere text-destructive', local.class)}
    />
  );
}

const FieldsetContext = FieldsetPrimitive.Context;

export {
  Fieldset,
  FieldsetContext,
  FieldsetErrorText,
  FieldsetHelperText,
  FieldsetLegend,
  FieldsetRootProvider,
  useFieldset,
  useFieldsetContext,
};

export type {
  FieldsetContextProps,
  FieldsetErrorTextProps,
  FieldsetHelperTextProps,
  FieldsetLegendProps,
  FieldsetRootProps,
  FieldsetRootProviderProps,
  UseFieldsetContext,
  UseFieldsetProps,
  UseFieldsetReturn,
} from '@ark-ui/solid/fieldset';