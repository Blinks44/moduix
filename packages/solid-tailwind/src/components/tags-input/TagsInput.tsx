import {
  TagsInput as TagsInputPrimitive,
  useTagsInput,
  useTagsInputContext,
  useTagsInputItemContext,
} from '@ark-ui/solid/tags-input';
import { children, For, splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { CloseIcon } from '@/lib/moduix/icons/ui/Icons';
import { CloseButton } from '../close-button';

function TagsInput(props: ComponentProps<typeof TagsInputPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <TagsInputPrimitive.Root
      asChild={local.asChild}
      class={cn(
        'flex w-full max-w-96 flex-col gap-1 text-foreground data-disabled:opacity-50',
        local.class,
      )}
      {...others}
      data-slot="tags-input-root"
    >
      {local.children}
    </TagsInputPrimitive.Root>
  );
}

function TagsInputRootProvider(props: ComponentProps<typeof TagsInputPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <TagsInputPrimitive.RootProvider
      asChild={local.asChild}
      class={cn(
        'flex w-full max-w-96 flex-col gap-1 text-foreground data-disabled:opacity-50',
        local.class,
      )}
      {...others}
      data-slot="tags-input-root-provider"
    >
      {local.children}
    </TagsInputPrimitive.RootProvider>
  );
}

function TagsInputLabel(props: ComponentProps<typeof TagsInputPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.Label
      class={cn(
        'inline-flex items-center gap-1 text-sm leading-5 font-medium text-foreground data-disabled:opacity-50',
        local.class,
      )}
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
        'group flex min-h-control-md w-full flex-wrap items-center gap-1 rounded-md border border-border bg-background px-2 py-[0.3125rem] text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color,opacity] duration-200 ease-in-out data-disabled:pointer-events-none data-focus:outline-ring data-invalid:border-destructive data-invalid:data-focus:outline-destructive data-readonly:bg-background data-readonly:text-foreground motion-reduce:transition-none',
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
        'inline-flex min-h-control-xs max-w-full min-w-0 items-center gap-1 rounded-full border border-transparent bg-secondary px-2 py-0.5 text-xs leading-4 font-medium text-secondary-foreground transition-[border-color,background-color,color,box-shadow] duration-200 ease-in-out data-disabled:opacity-50 data-highlighted:ring-1 data-highlighted:ring-ring motion-reduce:transition-none',
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
        'inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-inherit outline-0 transition-[background-color,color,opacity,box-shadow] duration-200 ease-in-out group-data-readonly:hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none [&>svg]:pointer-events-none [&>svg]:size-2.5 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-current/12',
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
        'h-control-xs min-w-28 shrink grow-0 basis-28 border-0 bg-transparent px-1 text-sm leading-5 text-inherit outline-0 placeholder:text-muted-foreground read-only:cursor-default data-readonly:cursor-default',
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
        'h-control-xs min-w-28 shrink grow basis-28 border-0 bg-transparent px-1 text-sm leading-5 text-inherit outline-0 placeholder:text-muted-foreground read-only:cursor-default data-readonly:hidden data-readonly:cursor-default',
        local.class,
      )}
      {...others}
      data-slot="tags-input-input"
    />
  );
}

function TagsInputClearTrigger(props: ComponentProps<typeof TagsInputPrimitive.ClearTrigger>) {
  const [local, others] = splitProps(props, [
    'aria-label',
    'aria-labelledby',
    'asChild',
    'children',
    'class',
  ]);
  const tagsInput = useTagsInputContext();
  const resolvedChildren = children(() => local.children);
  const clearTriggerLabel = () => tagsInput().getClearTriggerProps()['aria-label'];

  if (local.asChild) {
    return (
      <TagsInputPrimitive.ClearTrigger
        asChild={local.asChild}
        class={cn('ms-auto shrink-0 self-center data-readonly:hidden', local.class)}
        aria-label={local['aria-label']}
        aria-labelledby={local['aria-labelledby']}
        {...others}
        data-slot="tags-input-clear-trigger"
      >
        {local.children}
      </TagsInputPrimitive.ClearTrigger>
    );
  }

  return (
    <TagsInputPrimitive.ClearTrigger
      asChild={(triggerProps) => (
        <CloseButton
          {...triggerProps()}
          aria-label={local['aria-label'] ?? clearTriggerLabel()}
          aria-labelledby={local['aria-labelledby']}
          data-part="clear-trigger"
          data-scope="tags-input"
          data-slot="tags-input-clear-trigger"
        >
          {resolvedChildren()}
        </CloseButton>
      )}
      class={cn(
        'ms-auto size-control-xs shrink-0 self-center focus-visible:outline-1 data-readonly:hidden motion-reduce:transition-none [&>svg]:size-3',
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