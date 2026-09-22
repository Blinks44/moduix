import {
  TagsInput as TagsInputPrimitive,
  useTagsInput,
  useTagsInputContext,
  useTagsInputItemContext,
} from '@ark-ui/solid/tags-input';
import { clsx } from 'clsx';
import { children, For, splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { CloseIcon } from '@/lib/moduix/icons/ui/Icons';
import { CloseButton } from '../close-button';
import styles from './TagsInput.module.css';

function TagsInput(props: ComponentProps<typeof TagsInputPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <TagsInputPrimitive.Root
      asChild={local.asChild}
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.root, local.class)}
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
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="tags-input-label"
    />
  );
}

function TagsInputControl(props: ComponentProps<typeof TagsInputPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.Control
      class={clsx(styles.control, local.class)}
      {...others}
      data-slot="tags-input-control"
    />
  );
}

function TagsInputItem(props: ComponentProps<typeof TagsInputPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.Item
      class={clsx(styles.item, local.class)}
      {...others}
      data-slot="tags-input-item"
    />
  );
}

function TagsInputItemPreview(props: ComponentProps<typeof TagsInputPrimitive.ItemPreview>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.ItemPreview
      class={clsx(styles.itemPreview, local.class)}
      {...others}
      data-slot="tags-input-item-preview"
    />
  );
}

function TagsInputItemText(props: ComponentProps<typeof TagsInputPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.ItemText
      class={clsx(styles.itemText, local.class)}
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
      class={clsx(styles.itemDeleteTrigger, local.class)}
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
      class={clsx(styles.itemInput, local.class)}
      {...others}
      data-slot="tags-input-item-input"
    />
  );
}

function TagsInputInput(props: ComponentProps<typeof TagsInputPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.Input
      class={clsx(styles.input, local.class)}
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
  const triggerClassName = () => clsx(styles.clearTrigger, local.class);
  const clearTriggerLabel = () => tagsInput().getClearTriggerProps()['aria-label'];

  if (local.asChild) {
    return (
      <TagsInputPrimitive.ClearTrigger
        asChild={local.asChild}
        class={triggerClassName()}
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
      class={triggerClassName()}
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
