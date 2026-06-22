import type { ComponentProps, ComponentRef } from 'react';
import {
  Editable as EditablePrimitive,
  useEditable as useEditablePrimitive,
  useEditableContext,
  type UseEditableProps,
} from '@ark-ui/react/editable';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { CheckIcon, CloseIcon, PencilIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Editable.module.css';

const EditableRoot = forwardRef<
  ComponentRef<typeof EditablePrimitive.Root>,
  ComponentProps<typeof EditablePrimitive.Root>
>(function EditableRoot({ activationMode = 'dblclick', className, ...props }, ref) {
  return (
    <EditablePrimitive.Root
      ref={ref}
      data-slot="editable-root"
      activationMode={activationMode}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const EditableRootProvider = forwardRef<
  ComponentRef<typeof EditablePrimitive.RootProvider>,
  ComponentProps<typeof EditablePrimitive.RootProvider>
>(function EditableRootProvider({ className, ...props }, ref) {
  return (
    <EditablePrimitive.RootProvider
      ref={ref}
      data-slot="editable-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const EditableLabel = forwardRef<
  ComponentRef<typeof EditablePrimitive.Label>,
  ComponentProps<typeof EditablePrimitive.Label>
>(function EditableLabel({ className, ...props }, ref) {
  return (
    <EditablePrimitive.Label
      ref={ref}
      data-slot="editable-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
    />
  );
});

const EditableArea = forwardRef<
  ComponentRef<typeof EditablePrimitive.Area>,
  ComponentProps<typeof EditablePrimitive.Area>
>(function EditableArea({ className, ...props }, ref) {
  return (
    <EditablePrimitive.Area
      ref={ref}
      data-slot="editable-area"
      className={clsx(styles.area, normalizeClassName(className))}
      {...props}
    />
  );
});

const EditableInput = forwardRef<
  ComponentRef<typeof EditablePrimitive.Input>,
  ComponentProps<typeof EditablePrimitive.Input>
>(function EditableInput({ className, ...props }, ref) {
  return (
    <EditablePrimitive.Input
      ref={ref}
      data-slot="editable-input"
      className={clsx(styles.input, normalizeClassName(className))}
      {...props}
    />
  );
});

const EditablePreview = forwardRef<
  ComponentRef<typeof EditablePrimitive.Preview>,
  ComponentProps<typeof EditablePrimitive.Preview>
>(function EditablePreview({ className, ...props }, ref) {
  return (
    <EditablePrimitive.Preview
      ref={ref}
      data-slot="editable-preview"
      className={clsx(styles.preview, normalizeClassName(className))}
      {...props}
    />
  );
});

const EditableControl = forwardRef<
  ComponentRef<typeof EditablePrimitive.Control>,
  ComponentProps<typeof EditablePrimitive.Control>
>(function EditableControl({ className, ...props }, ref) {
  return (
    <EditablePrimitive.Control
      ref={ref}
      data-slot="editable-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
    />
  );
});

const EditableEditTrigger = forwardRef<
  ComponentRef<typeof EditablePrimitive.EditTrigger>,
  ComponentProps<typeof EditablePrimitive.EditTrigger>
>(function EditableEditTrigger({ className, children, ...props }, ref) {
  return (
    <EditablePrimitive.EditTrigger
      ref={ref}
      data-slot="editable-edit-trigger"
      className={clsx(styles.trigger, normalizeClassName(className))}
      {...props}
    >
      {children ?? <PencilIcon />}
    </EditablePrimitive.EditTrigger>
  );
});

const EditableSubmitTrigger = forwardRef<
  ComponentRef<typeof EditablePrimitive.SubmitTrigger>,
  ComponentProps<typeof EditablePrimitive.SubmitTrigger>
>(function EditableSubmitTrigger({ className, children, ...props }, ref) {
  return (
    <EditablePrimitive.SubmitTrigger
      ref={ref}
      data-slot="editable-submit-trigger"
      className={clsx(styles.trigger, normalizeClassName(className))}
      {...props}
    >
      {children ?? <CheckIcon />}
    </EditablePrimitive.SubmitTrigger>
  );
});

const EditableCancelTrigger = forwardRef<
  ComponentRef<typeof EditablePrimitive.CancelTrigger>,
  ComponentProps<typeof EditablePrimitive.CancelTrigger>
>(function EditableCancelTrigger({ className, children, ...props }, ref) {
  return (
    <EditablePrimitive.CancelTrigger
      ref={ref}
      data-slot="editable-cancel-trigger"
      className={clsx(styles.trigger, normalizeClassName(className))}
      {...props}
    >
      {children ?? <CloseIcon />}
    </EditablePrimitive.CancelTrigger>
  );
});

const EditableContext = EditablePrimitive.Context;

function useEditable(props: UseEditableProps = {}) {
  return useEditablePrimitive({ activationMode: 'dblclick', ...props });
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
  Context: EditableContext,
});

export { Editable, useEditable, useEditableContext };
export type {
  EditableEditChangeDetails,
  EditableFocusOutsideEvent,
  EditableInteractOutsideEvent,
  EditablePointerDownOutsideEvent,
  EditableValueChangeDetails,
  UseEditableContext,
  UseEditableProps,
  UseEditableReturn,
} from '@ark-ui/react/editable';