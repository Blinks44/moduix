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

const EditableRoot = forwardRef<
  ComponentRef<typeof EditablePrimitive.Root>,
  ComponentProps<typeof EditablePrimitive.Root>
>(function EditableRoot({ activationMode = 'dblclick', className, ...props }, ref) {
  return (
    <EditablePrimitive.Root
      ref={ref}
      activationMode={activationMode}
      className={cn(
        'box-border inline-grid max-w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-1 text-foreground has-[[data-disabled]]:opacity-50',
        className,
      )}
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
      className={cn(
        'box-border inline-grid max-w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-1 text-foreground has-[[data-disabled]]:opacity-50',
        className,
      )}
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
        'col-span-full inline-flex items-center gap-1 text-sm leading-5 font-medium text-foreground data-invalid:text-destructive',
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
        'col-start-1 box-border inline-flex min-h-control-md w-full min-w-0 items-center rounded-md border border-border bg-background px-3.5 py-1 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out has-[[aria-invalid=true]]:border-destructive has-[[data-invalid]]:border-destructive data-disabled:pointer-events-none data-focus:outline-ring data-focus:has-[[aria-invalid=true]]:outline-destructive data-focus:has-[[data-invalid]]:outline-destructive motion-reduce:transition-none',
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
        'box-border block w-full min-w-0 appearance-none bg-transparent text-md leading-6 text-inherit outline-0 placeholder:text-muted-foreground [&:is(textarea)]:min-h-24 [&:is(textarea)]:resize-y',
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
        'box-border block min-h-[1lh] w-full min-w-0 cursor-text bg-transparent text-md leading-6 text-inherit outline-0 aria-readonly:cursor-default data-disabled:cursor-default data-readonly:cursor-default data-[placeholder-shown]:text-muted-foreground',
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
      className={cn('col-start-2 inline-flex items-center gap-1 self-center', className)}
      {...props}
      data-slot="editable-control"
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
      className={cn(
        'box-border inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:size-3.5 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
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
>(function EditableSubmitTrigger({ className, children, ...props }, ref) {
  return (
    <EditablePrimitive.SubmitTrigger
      ref={ref}
      className={cn(
        'box-border inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:size-3.5 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
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
>(function EditableCancelTrigger({ className, children, ...props }, ref) {
  return (
    <EditablePrimitive.CancelTrigger
      ref={ref}
      className={cn(
        'box-border inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:size-3.5 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
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
>(function EditableControls({ className, ...props }, ref) {
  return (
    <EditableControl ref={ref} className={className} {...props}>
      <EditablePrimitive.Context>
        {(editable) =>
          editable.editing ? (
            <>
              <EditableSubmitTrigger />
              <EditableCancelTrigger />
            </>
          ) : (
            <EditableEditTrigger />
          )
        }
      </EditablePrimitive.Context>
    </EditableControl>
  );
});

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