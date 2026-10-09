import { Field as FieldPrimitive, useField, useFieldContext } from '@ark-ui/solid/field';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'solid-js';
import type { JSX } from 'solid-js';
import { createEffect, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

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

const fieldRootVariants = cva(
  'flex w-full max-w-none flex-col items-start gap-1 text-foreground data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
);

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
      class={cn(fieldRootVariants(), local.class)}
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
      class={cn(fieldRootVariants(), local.class)}
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
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <FieldPrimitive.Label
      asChild={local.asChild}
      {...others}
      data-slot="field-label"
      class={cn(
        'inline-flex items-center gap-2 text-sm leading-5 font-medium wrap-anywhere text-foreground',
        local.class,
      )}
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
      class={cn(
        'min-h-control-md w-full max-w-none rounded-md border border-border bg-background px-3 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out file:me-3 file:cursor-pointer file:rounded-md file:border file:border-primary file:bg-primary file:px-2 file:py-0.5 file:font-medium file:text-primary-foreground file:transition-colors file:duration-200 file:ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive data-disabled:pointer-events-none data-disabled:opacity-50 data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none [:is([data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100 [@media(hover:hover)]:file:hover:bg-foreground [[data-slot=field-root-provider][data-disabled]_&]:opacity-100 [[data-slot=field-root][data-disabled]_&]:opacity-100 [[data-slot=input-group-root]:has([data-slot=input-root]:is([data-disabled],:disabled))_&]:opacity-100',
        local.class,
      )}
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
      class={cn(
        'min-h-20 w-full resize-y rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none data-disabled:pointer-events-none data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        local.class,
      )}
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

    for (const option of selectRef.options) {
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
      class={cn(
        'min-h-control-md w-full rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out focus-visible:outline-ring disabled:pointer-events-none data-disabled:pointer-events-none data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        local.class,
      )}
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
      class={cn('text-sm leading-5 wrap-anywhere text-muted-foreground', local.class)}
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
      class={cn('text-sm leading-5 font-medium wrap-anywhere text-destructive', local.class)}
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