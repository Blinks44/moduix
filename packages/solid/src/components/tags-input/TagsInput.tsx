import {
  TagsInput as TagsInputPrimitive,
  useTagsInput,
  useTagsInputContext,
  useTagsInputItemContext,
} from '@ark-ui/solid/tags-input';
import { clsx } from 'clsx';
import { children, For, splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { CloseButton } from '../close-button';
import styles from './TagsInput.module.css';

function TagsInput(props: ComponentProps<typeof TagsInputPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.Root
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="tags-input-root"
    />
  );
}

function TagsInputRootProvider(props: ComponentProps<typeof TagsInputPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="tags-input-root-provider"
    />
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
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  // Ark merges its label, anatomy, and state props onto the CloseButton host.
  return (
    <TagsInputPrimitive.ClearTrigger
      asChild={
        local.asChild ??
        ((triggerProps) => <CloseButton {...triggerProps()}>{local.children}</CloseButton>)
      }
      class={clsx(styles.clearTrigger, local.class)}
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