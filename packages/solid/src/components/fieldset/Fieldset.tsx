import {
  Fieldset as FieldsetPrimitive,
  useFieldset,
  useFieldsetContext,
} from '@ark-ui/solid/fieldset';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Fieldset.module.css';

function Fieldset(props: ComponentProps<typeof FieldsetPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldsetPrimitive.Root
      {...others}
      data-slot="fieldset-root"
      class={clsx(styles.root, local.class)}
    />
  );
}

function FieldsetRootProvider(props: ComponentProps<typeof FieldsetPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldsetPrimitive.RootProvider
      {...others}
      data-slot="fieldset-root-provider"
      class={clsx(styles.root, local.class)}
    />
  );
}

function FieldsetLegend(props: ComponentProps<typeof FieldsetPrimitive.Legend>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldsetPrimitive.Legend
      {...others}
      data-slot="fieldset-legend"
      class={clsx(styles.legend, local.class)}
    />
  );
}

function FieldsetHelperText(props: ComponentProps<typeof FieldsetPrimitive.HelperText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldsetPrimitive.HelperText
      {...others}
      data-slot="fieldset-helper-text"
      class={clsx(styles.helperText, local.class)}
    />
  );
}

function FieldsetErrorText(props: ComponentProps<typeof FieldsetPrimitive.ErrorText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FieldsetPrimitive.ErrorText
      {...others}
      data-slot="fieldset-error-text"
      class={clsx(styles.errorText, local.class)}
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