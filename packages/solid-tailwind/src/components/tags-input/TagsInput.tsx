import {
  TagsInput as TagsInputPrimitive,
  useTagsInput,
  useTagsInputContext,
  useTagsInputItemContext,
} from '@ark-ui/solid/tags-input';
import { children, For, splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { CloseButton } from '../close-button';

const rootClass =
  'flex w-96 max-w-full flex-col gap-1 text-foreground data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

function TagsInput(props: ComponentProps<typeof TagsInputPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.Root
      class={cn(rootClass, local.class)}
      {...others}
      data-slot="tags-input-root"
    />
  );
}

function TagsInputRootProvider(props: ComponentProps<typeof TagsInputPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.RootProvider
      class={cn(rootClass, local.class)}
      {...others}
      data-slot="tags-input-root-provider"
    />
  );
}

function TagsInputLabel(props: ComponentProps<typeof TagsInputPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.Label
      class={cn('inline-flex items-center gap-1 text-sm leading-5 font-medium', local.class)}
      {...others}
      data-slot="tags-input-label"
    />
  );
}

function TagsInputControl(props: ComponentProps<typeof TagsInputPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.Control
      class={cn(
        'group flex min-h-control-md w-full flex-wrap items-center gap-1 rounded-md border border-border bg-background px-2 py-[0.3125rem] outline-focus-inset outline-offset-focus-inset outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out data-disabled:pointer-events-none data-focus:outline-ring data-invalid:border-destructive data-invalid:data-focus:outline-destructive',
        local.class,
      )}
      {...others}
      data-slot="tags-input-control"
    />
  );
}

function TagsInputItem(props: ComponentProps<typeof TagsInputPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.Item
      class={cn('contents', local.class)}
      {...others}
      data-slot="tags-input-item"
    />
  );
}

function TagsInputItemPreview(props: ComponentProps<typeof TagsInputPrimitive.ItemPreview>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.ItemPreview
      class={cn(
        'inline-flex min-h-control-xs max-w-full min-w-0 items-center gap-1 rounded-full border border-transparent bg-secondary px-2 py-0.5 text-xs leading-4 font-medium text-secondary-foreground transition-shadow duration-normal ease-in-out data-highlighted:ring-1 data-highlighted:ring-ring',
        local.class,
      )}
      {...others}
      data-slot="tags-input-item-preview"
    />
  );
}

function TagsInputItemText(props: ComponentProps<typeof TagsInputPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.ItemText
      class={cn('min-w-0 truncate', local.class)}
      {...others}
      data-slot="tags-input-item-text"
    />
  );
}

function TagsInputItemDeleteTrigger(
  props: ComponentProps<typeof TagsInputPrimitive.ItemDeleteTrigger>,
) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <TagsInputPrimitive.ItemDeleteTrigger
      class={cn(
        'inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-inherit outline-0 transition-[background-color,box-shadow] duration-normal ease-in-out group-data-readonly:hidden focus-visible:ring-1 focus-visible:ring-ring data-disabled:pointer-events-none data-disabled:opacity-disabled [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0 [:is([data-slot=tags-input-root],[data-slot=tags-input-root-provider])[data-disabled]_&]:opacity-100 [@media(hover:hover)]:hover:bg-current/12',
        local.class,
      )}
      {...others}
      data-slot="tags-input-item-delete-trigger"
    >
      {resolvedChildren() ?? <CloseIcon />}
    </TagsInputPrimitive.ItemDeleteTrigger>
  );
}

function TagsInputItemInput(props: ComponentProps<typeof TagsInputPrimitive.ItemInput>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.ItemInput
      class={cn(
        'h-control-xs min-w-28 shrink grow-0 basis-28 border-0 bg-transparent px-1 text-sm leading-5 text-inherit outline-0 placeholder:text-muted-foreground',
        local.class,
      )}
      {...others}
      data-slot="tags-input-item-input"
    />
  );
}

function TagsInputInput(props: ComponentProps<typeof TagsInputPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.Input
      class={cn(
        'h-control-xs min-w-28 shrink grow basis-28 border-0 bg-transparent px-1 text-sm leading-5 text-inherit outline-0 placeholder:text-muted-foreground data-readonly:hidden',
        local.class,
      )}
      {...others}
      data-slot="tags-input-input"
    />
  );
}

function TagsInputClearTrigger(props: ComponentProps<typeof TagsInputPrimitive.ClearTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  // Ark merges its label, anatomy, and state props onto the CloseButton host.
  return (
    <TagsInputPrimitive.ClearTrigger
      asChild={
        local.asChild ??
        ((triggerProps) => <CloseButton {...triggerProps()}>{local.children}</CloseButton>)
      }
      class={cn(
        local.asChild
          ? 'ms-auto data-readonly:hidden'
          : 'ms-auto size-control-xs focus-visible:outline-focus-inset focus-visible:outline-offset-1 data-readonly:hidden [:is([data-slot=tags-input-root],[data-slot=tags-input-root-provider])[data-disabled]_&]:opacity-100',
        local.class,
      )}
      {...others}
      data-slot="tags-input-clear-trigger"
    />
  );
}

const TagsInputContext = TagsInputPrimitive.Context;
const TagsInputHiddenInput = TagsInputPrimitive.HiddenInput;
const TagsInputItemContext = TagsInputPrimitive.ItemContext;

function TagsInputItems() {
  return (
    <TagsInputContext>
      {(tagsInput) => (
        <For each={tagsInput().value}>
          {(value, index) => (
            <TagsInputItem index={index()} value={value}>
              <TagsInputItemPreview>
                <TagsInputItemText>{value}</TagsInputItemText>
                <TagsInputItemDeleteTrigger />
              </TagsInputItemPreview>
              <TagsInputItemInput />
            </TagsInputItem>
          )}
        </For>
      )}
    </TagsInputContext>
  );
}

export {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputContext,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemContext,
  TagsInputItemDeleteTrigger,
  TagsInputItemInput,
  TagsInputItemPreview,
  TagsInputItemText,
  TagsInputItems,
  TagsInputLabel,
  TagsInputRootProvider,
  useTagsInput,
  useTagsInputContext,
  useTagsInputItemContext,
};

export type {
  TagsInputClearTriggerProps,
  TagsInputContextProps,
  TagsInputControlProps,
  TagsInputFocusOutsideEvent,
  TagsInputHighlightChangeDetails,
  TagsInputHiddenInputProps,
  TagsInputInputProps,
  TagsInputInputValueChangeDetails,
  TagsInputInteractOutsideEvent,
  TagsInputItemContextProps,
  TagsInputItemDeleteTriggerProps,
  TagsInputItemInputProps,
  TagsInputItemPreviewProps,
  TagsInputItemProps,
  TagsInputItemTextProps,
  TagsInputLabelProps,
  TagsInputPointerDownOutsideEvent,
  TagsInputRootProps,
  TagsInputRootProviderProps,
  TagsInputValidityChangeDetails,
  TagsInputValueChangeDetails,
  UseTagsInputContext,
  UseTagsInputItemContext,
  UseTagsInputProps,
  UseTagsInputReturn,
} from '@ark-ui/solid/tags-input';