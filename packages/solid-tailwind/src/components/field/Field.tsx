import { Field as FieldPrimitive, useField, useFieldContext } from '@ark-ui/solid/field';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type FieldItemProps = ComponentProps<typeof FieldPrimitive.Item> & ComponentProps<'div'>;

const rootClass =
  'flex w-full flex-col items-start gap-1 text-foreground data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

function Field(props: ComponentProps<typeof FieldPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldPrimitive.Root {...others} data-slot="field-root" class={cn(rootClass, local.class)} />
  );
}

function FieldRootProvider(props: ComponentProps<typeof FieldPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldPrimitive.RootProvider
      {...others}
      data-slot="field-root-provider"
      class={cn(rootClass, local.class)}
    />
  );
}

function FieldItem(props: FieldItemProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'ref', 'value']);

  return (
    <FieldPrimitive.Item value={local.value}>
      <div {...others} data-slot="field-item" class={cn('grid gap-1', local.class)} ref={local.ref}>
        {local.children}
      </div>
    </FieldPrimitive.Item>
  );
}

function FieldLabel(props: ComponentProps<typeof FieldPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldPrimitive.Label
      {...others}
      data-slot="field-label"
      class={cn(
        'inline-flex items-center gap-2 text-sm leading-5 font-medium wrap-anywhere text-foreground',
        local.class,
      )}
    />
  );
}

function FieldHelperText(props: ComponentProps<typeof FieldPrimitive.HelperText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldPrimitive.HelperText
      {...others}
      data-slot="field-helper-text"
      class={cn('text-sm leading-5 wrap-anywhere text-muted-foreground', local.class)}
    />
  );
}

function FieldErrorText(props: ComponentProps<typeof FieldPrimitive.ErrorText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldPrimitive.ErrorText
      {...others}
      data-slot="field-error-text"
      class={cn('text-sm leading-5 font-medium wrap-anywhere text-destructive', local.class)}
    />
  );
}

function FieldRequiredIndicator(props: ComponentProps<typeof FieldPrimitive.RequiredIndicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldPrimitive.RequiredIndicator
      {...others}
      data-slot="field-required-indicator"
      class={cn('text-destructive', local.class)}
    />
  );
}

const FieldContext = FieldPrimitive.Context;

export {
  Field,
  FieldContext,
  FieldErrorText,
  FieldHelperText,
  FieldItem,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRootProvider,
  useField,
  useFieldContext,
};

export type {
  FieldContextProps,
  FieldErrorTextProps,
  FieldHelperTextProps,
  FieldLabelProps,
  FieldRequiredIndicatorProps,
  FieldRootProps,
  FieldRootProviderProps,
  UseFieldContext,
  UseFieldProps,
  UseFieldReturn,
} from '@ark-ui/solid/field';