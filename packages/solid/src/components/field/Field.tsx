import { Field as FieldPrimitive, useField, useFieldContext } from '@ark-ui/solid/field';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Field.module.css';

type FieldItemProps = ComponentProps<typeof FieldPrimitive.Item> & ComponentProps<'div'>;

function Field(props: ComponentProps<typeof FieldPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldPrimitive.Root
      {...others}
      data-slot="field-root"
      class={clsx(styles.root, local.class)}
    />
  );
}

function FieldRootProvider(props: ComponentProps<typeof FieldPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldPrimitive.RootProvider
      {...others}
      data-slot="field-root-provider"
      class={clsx(styles.root, local.class)}
    />
  );
}

function FieldItem(props: FieldItemProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'ref', 'value']);

  return (
    <FieldPrimitive.Item value={local.value}>
      <div
        {...others}
        data-slot="field-item"
        class={clsx(styles.item, local.class)}
        ref={local.ref}
      >
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
      class={clsx(styles.label, local.class)}
    />
  );
}

function FieldHelperText(props: ComponentProps<typeof FieldPrimitive.HelperText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldPrimitive.HelperText
      {...others}
      data-slot="field-helper-text"
      class={clsx(styles.helperText, local.class)}
    />
  );
}

function FieldErrorText(props: ComponentProps<typeof FieldPrimitive.ErrorText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldPrimitive.ErrorText
      {...others}
      data-slot="field-error-text"
      class={clsx(styles.errorText, local.class)}
    />
  );
}

function FieldRequiredIndicator(props: ComponentProps<typeof FieldPrimitive.RequiredIndicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldPrimitive.RequiredIndicator
      {...others}
      data-slot="field-required-indicator"
      class={clsx(styles.requiredIndicator, local.class)}
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