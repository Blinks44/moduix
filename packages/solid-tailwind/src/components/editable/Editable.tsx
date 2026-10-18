import {
  Editable as EditablePrimitive,
  useEditable,
  useEditableContext,
} from '@ark-ui/solid/editable';
import type { ComponentProps } from 'solid-js';
import { children, Show, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, CloseIcon, PencilIcon } from '@/lib/moduix/icons/ui';

const rootClass =
  'box-border grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-1 text-foreground has-data-autoresize:w-fit has-data-autoresize:max-w-full has-data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

const triggerClass =
  'box-border inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,outline-color] duration-normal ease-in-out focus-visible:outline-ring active:bg-accent disabled:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent';

function Editable(props: ComponentProps<typeof EditablePrimitive.Root>) {
  const [local, others] = splitProps(props, ['activationMode', 'class']);

  return (
    <EditablePrimitive.Root
      activationMode={local.activationMode ?? 'dblclick'}
      class={cn(rootClass, local.class)}
      {...others}
      data-slot="editable-root"
    />
  );
}

function EditableRootProvider(props: ComponentProps<typeof EditablePrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.RootProvider
      class={cn(rootClass, local.class)}
      {...others}
      data-slot="editable-root-provider"
    />
  );
}

function EditableLabel(props: ComponentProps<typeof EditablePrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Label
      class={cn(
        'col-span-full flex items-center gap-1 text-sm leading-5 font-medium wrap-anywhere data-invalid:text-destructive',
        local.class,
      )}
      {...others}
      data-slot="editable-label"
    />
  );
}

function EditableArea(props: ComponentProps<typeof EditablePrimitive.Area>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Area
      class={cn(
        'box-border flex min-h-control-md min-w-0 items-center rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out has-focus-visible:outline-ring has-data-invalid:border-destructive has-data-invalid:has-focus-visible:outline-destructive data-disabled:pointer-events-none data-focus:outline-ring has-data-invalid:data-focus:outline-destructive',
        local.class,
      )}
      {...others}
      data-slot="editable-area"
    />
  );
}

function EditableInput(props: ComponentProps<typeof EditablePrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Input
      class={cn(
        'box-border w-full min-w-0 appearance-none bg-transparent text-inherit outline-0 placeholder:text-muted-foreground [&:is(textarea)]:min-h-24 [&:is(textarea)]:resize-y',
        local.class,
      )}
      {...others}
      data-slot="editable-input"
    />
  );
}

function EditablePreview(props: ComponentProps<typeof EditablePrimitive.Preview>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Preview
      class={cn(
        'box-border w-full min-w-0 cursor-text bg-transparent wrap-anywhere whitespace-pre-wrap text-inherit outline-0 aria-readonly:cursor-default data-disabled:cursor-default data-placeholder-shown:text-muted-foreground',
        local.class,
      )}
      {...others}
      data-slot="editable-preview"
    />
  );
}

function EditableControl(props: ComponentProps<typeof EditablePrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Control
      class={cn('flex items-center gap-1', local.class)}
      {...others}
      data-slot="editable-control"
    />
  );
}

function EditableEditTrigger(props: ComponentProps<typeof EditablePrimitive.EditTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <EditablePrimitive.EditTrigger
      asChild={local.asChild}
      class={cn(!local.asChild && triggerClass, local.class)}
      {...others}
      data-slot="editable-edit-trigger"
    >
      {resolvedChildren() ?? <PencilIcon />}
    </EditablePrimitive.EditTrigger>
  );
}

function EditableSubmitTrigger(props: ComponentProps<typeof EditablePrimitive.SubmitTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <EditablePrimitive.SubmitTrigger
      asChild={local.asChild}
      class={cn(!local.asChild && triggerClass, local.class)}
      {...others}
      data-slot="editable-submit-trigger"
    >
      {resolvedChildren() ?? <CheckIcon />}
    </EditablePrimitive.SubmitTrigger>
  );
}

function EditableCancelTrigger(props: ComponentProps<typeof EditablePrimitive.CancelTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <EditablePrimitive.CancelTrigger
      asChild={local.asChild}
      class={cn(!local.asChild && triggerClass, local.class)}
      {...others}
      data-slot="editable-cancel-trigger"
    >
      {resolvedChildren() ?? <CloseIcon />}
    </EditablePrimitive.CancelTrigger>
  );
}

function EditableControls(
  props: Omit<ComponentProps<typeof EditablePrimitive.Control>, 'asChild' | 'children'>,
) {
  const editable = useEditableContext();

  return (
    <EditableControl {...props}>
      <Show when={editable().editing} fallback={<EditableEditTrigger />}>
        <EditableSubmitTrigger />
        <EditableCancelTrigger />
      </Show>
    </EditableControl>
  );
}

const EditableContext = EditablePrimitive.Context;

export {
  Editable,
  EditableArea,
  EditableCancelTrigger,
  EditableContext,
  EditableControl,
  EditableControls,
  EditableEditTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableRootProvider,
  EditableSubmitTrigger,
  useEditable,
  useEditableContext,
};

export type {
  EditableAreaProps,
  EditableCancelTriggerProps,
  EditableContextProps,
  EditableControlProps,
  EditableEditChangeDetails,
  EditableEditTriggerProps,
  EditableFocusOutsideEvent,
  EditableInputProps,
  EditableInteractOutsideEvent,
  EditableLabelProps,
  EditablePointerDownOutsideEvent,
  EditablePreviewProps,
  EditableRootProps,
  EditableRootProviderProps,
  EditableSubmitTriggerProps,
  EditableValueChangeDetails,
  UseEditableContext,
  UseEditableProps,
  UseEditableReturn,
} from '@ark-ui/solid/editable';