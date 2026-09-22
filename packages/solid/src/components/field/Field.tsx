import { Field as FieldPrimitive, useField, useFieldContext } from '@ark-ui/solid/field';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import type { JSX } from 'solid-js';
import { createEffect, splitProps } from 'solid-js';
import styles from './Field.module.css';

type FieldItemProps = ComponentProps<typeof FieldPrimitive.Item> & ComponentProps<'div'>;
type FieldInputProps = ComponentProps<typeof FieldPrimitive.Input> & {
  defaultValue?: string | number | readonly string[];
};
type FieldTextareaProps = ComponentProps<typeof FieldPrimitive.Textarea> & {
  defaultValue?: string | number | readonly string[];
};
type FieldSelectProps = ComponentProps<typeof FieldPrimitive.Select> & {
  defaultValue?: ComponentProps<typeof FieldPrimitive.Select>['value'];
};
type FieldSelectPrimitiveProps = ComponentProps<typeof FieldPrimitive.Select> & {
  'prop:defaultValue'?: FieldSelectProps['defaultValue'];
};

const FieldSelectPrimitive = FieldPrimitive.Select as (
  props: FieldSelectPrimitiveProps,
) => JSX.Element;

function Field(props: ComponentProps<typeof FieldPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <FieldPrimitive.Root
      asChild={local.asChild}
      {...others}
      data-slot="field-root"
      class={clsx(styles.root, local.class)}
    />
  );
}

function FieldRootProvider(props: ComponentProps<typeof FieldPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <FieldPrimitive.RootProvider
      asChild={local.asChild}
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
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <FieldPrimitive.Label
      asChild={local.asChild}
      {...others}
      data-slot="field-label"
      class={clsx(styles.label, local.class)}
    />
  );
}

function FieldInput(props: FieldInputProps) {
  const [local, others] = splitProps(props, ['asChild', 'class', 'defaultValue', 'ref']);
  let inputRef: HTMLInputElement | undefined;

  createEffect(() => {
    if (inputRef) inputRef.defaultValue = String(local.defaultValue ?? '');
  });

  return (
    <FieldPrimitive.Input
      asChild={local.asChild}
      {...others}
      {...(local.asChild ? { 'prop:defaultValue': local.defaultValue } : {})}
      data-slot="field-input"
      class={clsx(styles.control, local.class)}
      ref={(element) => {
        inputRef = element;
        if (typeof local.ref === 'function') local.ref(element);
      }}
    />
  );
}

function FieldTextarea(props: FieldTextareaProps) {
  const [local, others] = splitProps(props, ['asChild', 'class', 'defaultValue', 'ref']);
  let textareaRef: HTMLTextAreaElement | undefined;

  createEffect(() => {
    if (textareaRef) textareaRef.defaultValue = String(local.defaultValue ?? '');
  });

  return (
    <FieldPrimitive.Textarea
      asChild={local.asChild}
      {...others}
      {...(local.asChild ? { 'prop:defaultValue': local.defaultValue } : {})}
      data-slot="field-textarea"
      class={clsx(styles.control, styles.textarea, local.class)}
      ref={(element) => {
        textareaRef = element;
        if (typeof local.ref === 'function') local.ref(element);
      }}
    />
  );
}

function FieldSelect(props: FieldSelectProps) {
  const [local, others] = splitProps(props, ['asChild', 'class', 'defaultValue', 'ref']);
  let selectRef: HTMLSelectElement | undefined;

  createEffect(() => {
    const defaultValue = local.defaultValue;

    if (!selectRef || defaultValue === undefined) return;

    const values = new Set(
      (Array.isArray(defaultValue) ? defaultValue : [defaultValue]).map((value) => String(value)),
    );

    for (const option of Array.from(selectRef.options)) {
      const selected = values.has(option.value);
      option.selected = selected;
      option.defaultSelected = selected;
    }
  });

  return (
    <FieldSelectPrimitive
      asChild={local.asChild}
      {...others}
      prop:defaultValue={local.defaultValue}
      data-slot="field-select"
      class={clsx(styles.control, local.class)}
      ref={(element) => {
        selectRef = element;
        if (typeof local.ref === 'function') local.ref(element);
      }}
    />
  );
}

function FieldHelperText(props: ComponentProps<typeof FieldPrimitive.HelperText>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <FieldPrimitive.HelperText
      asChild={local.asChild}
      {...others}
      data-slot="field-helper-text"
      class={clsx(styles.helperText, local.class)}
    />
  );
}

function FieldErrorText(props: ComponentProps<typeof FieldPrimitive.ErrorText>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <FieldPrimitive.ErrorText
      asChild={local.asChild}
      {...others}
      data-slot="field-error-text"
      class={clsx(styles.errorText, local.class)}
    />
  );
}

function FieldRequiredIndicator(props: ComponentProps<typeof FieldPrimitive.RequiredIndicator>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <FieldPrimitive.RequiredIndicator
      asChild={local.asChild}
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
  FieldInput,
  FieldItem,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRootProvider,
  FieldSelect,
  FieldTextarea,
  useField,
  useFieldContext,
};