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
      data-slot="editable-root"
      activationMode={local.activationMode ?? 'dblclick'}
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function EditableRootProvider(props: ComponentProps<typeof EditablePrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.RootProvider
      data-slot="editable-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function EditableLabel(props: ComponentProps<typeof EditablePrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Label
      data-slot="editable-label"
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

function EditableArea(props: ComponentProps<typeof EditablePrimitive.Area>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Area
      data-slot="editable-area"
      class={clsx(styles.area, local.class)}
      {...others}
    />
  );
}

function EditableInput(props: ComponentProps<typeof EditablePrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Input
      data-slot="editable-input"
      class={clsx(styles.input, local.class)}
      {...others}
    />
  );
}

function EditablePreview(props: ComponentProps<typeof EditablePrimitive.Preview>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Preview
      data-slot="editable-preview"
      class={clsx(styles.preview, local.class)}
      {...others}
    />
  );
}

function EditableControl(props: ComponentProps<typeof EditablePrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Control
      data-slot="editable-control"
      class={clsx(styles.control, local.class)}
      {...others}
    />
  );
}

function EditableEditTrigger(props: ComponentProps<typeof EditablePrimitive.EditTrigger>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <EditablePrimitive.EditTrigger
      data-slot="editable-edit-trigger"
      class={clsx(styles.trigger, local.class)}
      {...others}
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
      data-slot="editable-submit-trigger"
      class={clsx(styles.trigger, local.class)}
      {...others}
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
      data-slot="editable-cancel-trigger"
      class={clsx(styles.trigger, local.class)}
      {...others}
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