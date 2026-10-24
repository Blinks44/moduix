'use client';

import {
  Editable as EditablePrimitive,
  useEditable,
  useEditableContext,
} from '@ark-ui/react/editable';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, CloseIcon, PencilIcon } from '@/lib/moduix/icons/ui';

const rootClass =
  'grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-1 text-foreground has-data-autoresize:w-fit has-data-autoresize:max-w-full has-data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

const triggerClass =
  'inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-focus-inset outline-offset-focus-inset outline-transparent transition-[background-color,outline-color] duration-normal ease-in-out focus-visible:outline-ring active:bg-accent disabled:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent';

const Editable = forwardRef<
  ComponentRef<typeof EditablePrimitive.Root>,
  ComponentProps<typeof EditablePrimitive.Root>
>(function Editable({ activationMode = 'dblclick', className, ...props }, ref) {
  return (
    <EditablePrimitive.Root
      ref={ref}
      activationMode={activationMode}
      className={cn(rootClass, className)}
      {...props}
      data-slot="editable-root"
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
      className={cn(rootClass, className)}
      {...props}
      data-slot="editable-root-provider"
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
      className={cn(
        'col-span-full flex items-center gap-1 text-sm leading-5 font-medium wrap-anywhere data-invalid:text-destructive',
        className,
      )}
      {...props}
      data-slot="editable-label"
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
      className={cn(
        'flex min-h-control-md min-w-0 items-center rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 outline-focus-inset outline-offset-focus-inset outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out has-focus-visible:outline-ring has-data-invalid:border-destructive has-data-invalid:has-focus-visible:outline-destructive data-disabled:pointer-events-none data-focus:outline-ring has-data-invalid:data-focus:outline-destructive',
        className,
      )}
      {...props}
      data-slot="editable-area"
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
      className={cn(
        'w-full min-w-0 appearance-none bg-transparent text-inherit outline-0 placeholder:text-muted-foreground [&:is(textarea)]:min-h-24 [&:is(textarea)]:resize-y',
        className,
      )}
      {...props}
      data-slot="editable-input"
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
      className={cn(
        'w-full min-w-0 cursor-text bg-transparent wrap-anywhere whitespace-pre-wrap text-inherit outline-0 aria-readonly:cursor-default data-disabled:cursor-default data-placeholder-shown:text-muted-foreground',
        className,
      )}
      {...props}
      data-slot="editable-preview"
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
      className={cn('flex items-center gap-1', className)}
      {...props}
      data-slot="editable-control"
    />
  );
});

const EditableEditTrigger = forwardRef<
  ComponentRef<typeof EditablePrimitive.EditTrigger>,
  ComponentProps<typeof EditablePrimitive.EditTrigger>
>(function EditableEditTrigger({ asChild, className, children, ...props }, ref) {
  return (
    <EditablePrimitive.EditTrigger
      ref={ref}
      asChild={asChild}
      className={cn(!asChild && triggerClass, className)}
      {...props}
      data-slot="editable-edit-trigger"
    >
      {children ?? <PencilIcon />}
    </EditablePrimitive.EditTrigger>
  );
});

const EditableSubmitTrigger = forwardRef<
  ComponentRef<typeof EditablePrimitive.SubmitTrigger>,
  ComponentProps<typeof EditablePrimitive.SubmitTrigger>
>(function EditableSubmitTrigger({ asChild, className, children, ...props }, ref) {
  return (
    <EditablePrimitive.SubmitTrigger
      ref={ref}
      asChild={asChild}
      className={cn(!asChild && triggerClass, className)}
      {...props}
      data-slot="editable-submit-trigger"
    >
      {children ?? <CheckIcon />}
    </EditablePrimitive.SubmitTrigger>
  );
});

const EditableCancelTrigger = forwardRef<
  ComponentRef<typeof EditablePrimitive.CancelTrigger>,
  ComponentProps<typeof EditablePrimitive.CancelTrigger>
>(function EditableCancelTrigger({ asChild, className, children, ...props }, ref) {
  return (
    <EditablePrimitive.CancelTrigger
      ref={ref}
      asChild={asChild}
      className={cn(!asChild && triggerClass, className)}
      {...props}
      data-slot="editable-cancel-trigger"
    >
      {children ?? <CloseIcon />}
    </EditablePrimitive.CancelTrigger>
  );
});

const EditableControls = forwardRef<
  ComponentRef<typeof EditablePrimitive.Control>,
  Omit<ComponentProps<typeof EditablePrimitive.Control>, 'asChild' | 'children'>
>(function EditableControls(props, ref) {
  const editable = useEditableContext();

  return (
    <EditableControl ref={ref} {...props}>
      {editable.editing ? (
        <>
          <EditableSubmitTrigger />
          <EditableCancelTrigger />
        </>
      ) : (
        <EditableEditTrigger />
      )}
    </EditableControl>
  );
});

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
} from '@ark-ui/react/editable';