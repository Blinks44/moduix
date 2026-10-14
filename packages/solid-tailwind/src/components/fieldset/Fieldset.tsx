import {
  Fieldset as FieldsetPrimitive,
  useFieldset,
  useFieldsetContext,
} from '@ark-ui/solid/fieldset';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

function Fieldset(props: ComponentProps<typeof FieldsetPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldsetPrimitive.Root
      {...others}
      data-slot="fieldset-root"
      class={cn(
        'flex w-full max-w-none min-w-0 flex-col gap-4 border-transparent data-disabled:opacity-50 data-invalid:border-destructive',
        local.class,
      )}
    />
  );
}

function FieldsetRootProvider(props: ComponentProps<typeof FieldsetPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldsetPrimitive.RootProvider
      {...others}
      data-slot="fieldset-root-provider"
      class={cn(
        'flex w-full max-w-none min-w-0 flex-col gap-4 border-transparent data-disabled:opacity-50 data-invalid:border-destructive',
        local.class,
      )}
    />
  );
}

function FieldsetLegend(props: ComponentProps<typeof FieldsetPrimitive.Legend>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldsetPrimitive.Legend
      {...others}
      data-slot="fieldset-legend"
      class={cn(
        'inline-block max-w-full pb-3 text-lg font-semibold wrap-anywhere text-foreground',
        local.class,
      )}
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