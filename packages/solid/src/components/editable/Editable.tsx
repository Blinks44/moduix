import {
  Editable as EditablePrimitive,
  useEditable,
  useEditableContext,
} from '@ark-ui/solid/editable';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, Show, splitProps } from 'solid-js';
import { CheckIcon, CloseIcon, PencilIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Editable.module.css';

function EditableRoot(props: ComponentProps<typeof EditablePrimitive.Root>) {
  const [local, others] = splitProps(props, ['activationMode', 'class']);

  return (
    <EditablePrimitive.Root
      activationMode={local.activationMode ?? 'dblclick'}
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="editable-root"
    />
  );
}

function EditableRootProvider(props: ComponentProps<typeof EditablePrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="editable-root-provider"
    />
  );
}

function EditableLabel(props: ComponentProps<typeof EditablePrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Label
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="editable-label"
    />
  );
}

function EditableArea(props: ComponentProps<typeof EditablePrimitive.Area>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Area
      class={clsx(styles.area, local.class)}
      {...others}
      data-slot="editable-area"
    />
  );
}

function EditableInput(props: ComponentProps<typeof EditablePrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Input
      class={clsx(styles.input, local.class)}
      {...others}
      data-slot="editable-input"
    />
  );
}

function EditablePreview(props: ComponentProps<typeof EditablePrimitive.Preview>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Preview
      class={clsx(styles.preview, local.class)}
      {...others}
      data-slot="editable-preview"
    />
  );
}

function EditableControl(props: ComponentProps<typeof EditablePrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Control
      class={clsx(styles.control, local.class)}
      {...others}
      data-slot="editable-control"
    />
  );
}

function EditableEditTrigger(props: ComponentProps<typeof EditablePrimitive.EditTrigger>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <EditablePrimitive.EditTrigger
      class={clsx(styles.trigger, local.class)}
      {...others}
      data-slot="editable-edit-trigger"
    >
      {resolvedChildren() ?? <PencilIcon />}
    </EditablePrimitive.EditTrigger>
  );
}

function EditableSubmitTrigger(props: ComponentProps<typeof EditablePrimitive.SubmitTrigger>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <EditablePrimitive.SubmitTrigger
      class={clsx(styles.trigger, local.class)}
      {...others}
      data-slot="editable-submit-trigger"
    >
      {resolvedChildren() ?? <CheckIcon />}
    </EditablePrimitive.SubmitTrigger>
  );
}

function EditableCancelTrigger(props: ComponentProps<typeof EditablePrimitive.CancelTrigger>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <EditablePrimitive.CancelTrigger
      class={clsx(styles.trigger, local.class)}
      {...others}
      data-slot="editable-cancel-trigger"
    >
      {resolvedChildren() ?? <CloseIcon />}
    </EditablePrimitive.CancelTrigger>
  );
}

type EditableControlsProps = Omit<
  ComponentProps<typeof EditablePrimitive.Control>,
  'asChild' | 'children'
>;

function EditableControls(props: EditableControlsProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditableControl class={local.class} {...others}>
      <EditablePrimitive.Context>
        {(editable) => (
          <Show when={editable().editing} fallback={<EditableEditTrigger />}>
            <EditableSubmitTrigger />
            <EditableCancelTrigger />
          </Show>
        )}
      </EditablePrimitive.Context>
    </EditableControl>
  );
}

const Editable = Object.assign(EditableRoot, {
  Root: EditableRoot,
  RootProvider: EditableRootProvider,
  Label: EditableLabel,
  Area: EditableArea,
  Input: EditableInput,
  Preview: EditablePreview,
  Control: EditableControl,
  EditTrigger: EditableEditTrigger,
  SubmitTrigger: EditableSubmitTrigger,
  CancelTrigger: EditableCancelTrigger,
  Controls: EditableControls,
  Context: EditablePrimitive.Context,
});

export { Editable, useEditable, useEditableContext };