import {
  Editable as EditablePrimitive,
  useEditable,
  useEditableContext,
} from '@ark-ui/solid/editable';
import type { ComponentProps } from 'solid-js';
import { children, Show, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, CloseIcon, PencilIcon } from '@/lib/moduix/icons/ui/Icons';

function EditableRoot(props: ComponentProps<typeof EditablePrimitive.Root>) {
  const [local, others] = splitProps(props, ['activationMode', 'class']);

  return (
    <EditablePrimitive.Root
      data-slot="editable-root"
      activationMode={local.activationMode ?? 'dblclick'}
      class={cn(
        'box-border inline-grid max-w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-1 text-foreground has-[[data-disabled]]:opacity-50',
        local.class,
      )}
      {...others}
    />
  );
}

function EditableRootProvider(props: ComponentProps<typeof EditablePrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.RootProvider
      data-slot="editable-root-provider"
      class={cn(
        'box-border inline-grid max-w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-1 text-foreground has-[[data-disabled]]:opacity-50',
        local.class,
      )}
      {...others}
    />
  );
}

function EditableLabel(props: ComponentProps<typeof EditablePrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Label
      data-slot="editable-label"
      class={cn(
        'col-span-full inline-flex items-center gap-1 text-sm leading-5 font-medium text-foreground data-invalid:text-destructive',
        local.class,
      )}
      {...others}
    />
  );
}

function EditableArea(props: ComponentProps<typeof EditablePrimitive.Area>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Area
      data-slot="editable-area"
      class={cn(
        'col-start-1 box-border inline-flex min-h-control-md w-full min-w-0 items-center rounded-md border border-border bg-background px-3.5 py-1 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out has-[[aria-invalid=true]]:border-destructive has-[[data-invalid]]:border-destructive data-disabled:pointer-events-none data-focus:outline-ring data-focus:has-[[aria-invalid=true]]:outline-destructive data-focus:has-[[data-invalid]]:outline-destructive motion-reduce:transition-none',
        local.class,
      )}
      {...others}
    />
  );
}

function EditableInput(props: ComponentProps<typeof EditablePrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Input
      data-slot="editable-input"
      class={cn(
        'box-border block w-full min-w-0 appearance-none bg-transparent text-md leading-6 text-inherit outline-0 placeholder:text-muted-foreground [&:is(textarea)]:min-h-24 [&:is(textarea)]:resize-y',
        local.class,
      )}
      {...others}
    />
  );
}

function EditablePreview(props: ComponentProps<typeof EditablePrimitive.Preview>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Preview
      data-slot="editable-preview"
      class={cn(
        'box-border block min-h-[1lh] w-full min-w-0 cursor-text bg-transparent text-md leading-6 text-inherit outline-0 aria-readonly:cursor-default data-disabled:cursor-default data-readonly:cursor-default data-[placeholder-shown]:text-muted-foreground',
        local.class,
      )}
      {...others}
    />
  );
}

function EditableControl(props: ComponentProps<typeof EditablePrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <EditablePrimitive.Control
      data-slot="editable-control"
      class={cn('col-start-2 inline-flex items-center gap-1 self-center', local.class)}
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
      class={cn(
        'box-border inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:size-3.5 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
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
      class={cn(
        'box-border inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:size-3.5 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
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
      class={cn(
        'box-border inline-flex size-control-md shrink-0 cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,color,outline-color,opacity] duration-200 ease-in-out focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-focus:outline-ring motion-reduce:transition-none [&>svg]:size-3.5 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
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