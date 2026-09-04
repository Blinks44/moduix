import { useFieldContext } from '@ark-ui/solid/field';
import {
  TagsInput as TagsInputPrimitive,
  useTagsInput,
  useTagsInputContext,
  useTagsInputItemContext,
} from '@ark-ui/solid/tags-input';
import { clsx } from 'clsx';
import { children, For, onCleanup, onMount, splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { CloseIcon } from '@/lib/moduix/icons/ui/Icons';
import { CloseButton } from '../close-button';
import styles from './TagsInput.module.css';

function TagsInputRoot(props: ComponentProps<typeof TagsInputPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <TagsInputPrimitive.Root
      asChild={local.asChild}
      data-slot="tags-input-root"
      class={clsx(styles.root, local.class)}
      {...others}
    >
      {local.children}
      <TagsInputHiddenInput />
    </TagsInputPrimitive.Root>
  );
}

function TagsInputRootProvider(props: ComponentProps<typeof TagsInputPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <TagsInputPrimitive.RootProvider
      asChild={local.asChild}
      data-slot="tags-input-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
    >
      {local.children}
      <TagsInputHiddenInput />
    </TagsInputPrimitive.RootProvider>
  );
}

function TagsInputLabel(props: ComponentProps<typeof TagsInputPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.Label
      data-slot="tags-input-label"
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

function TagsInputControl(props: ComponentProps<typeof TagsInputPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.Control
      data-slot="tags-input-control"
      class={clsx(styles.control, local.class)}
      {...others}
    />
  );
}

function TagsInputItem(props: ComponentProps<typeof TagsInputPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.Item
      data-slot="tags-input-item"
      class={clsx(styles.item, local.class)}
      {...others}
    />
  );
}

function TagsInputItemPreview(props: ComponentProps<typeof TagsInputPrimitive.ItemPreview>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.ItemPreview
      data-slot="tags-input-item-preview"
      class={clsx(styles.itemPreview, local.class)}
      {...others}
    />
  );
}

function TagsInputItemText(props: ComponentProps<typeof TagsInputPrimitive.ItemText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.ItemText
      data-slot="tags-input-item-text"
      class={clsx(styles.itemText, local.class)}
      {...others}
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
      data-slot="tags-input-item-delete-trigger"
      class={clsx(styles.itemDeleteTrigger, local.class)}
      {...others}
    >
      {resolvedChildren() ?? <CloseIcon />}
    </TagsInputPrimitive.ItemDeleteTrigger>
  );
}

function TagsInputItemInput(props: ComponentProps<typeof TagsInputPrimitive.ItemInput>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.ItemInput
      data-slot="tags-input-item-input"
      class={clsx(styles.itemInput, local.class)}
      {...others}
    />
  );
}

function TagsInputInput(props: ComponentProps<typeof TagsInputPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TagsInputPrimitive.Input
      data-slot="tags-input-input"
      class={clsx(styles.input, local.class)}
      {...others}
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
        data-slot="tags-input-clear-trigger"
        class={triggerClassName()}
        aria-label={local['aria-label']}
        aria-labelledby={local['aria-labelledby']}
        {...others}
      >
        {local.children}
      </TagsInputPrimitive.ClearTrigger>
    );
  }

  return (
    <TagsInputPrimitive.ClearTrigger
      asChild={(triggerProps) => (
        <CloseButton.Root
          {...triggerProps()}
          aria-label={local['aria-label'] ?? clearTriggerLabel()}
          aria-labelledby={local['aria-labelledby']}
          data-part="clear-trigger"
          data-scope="tags-input"
          data-slot="tags-input-clear-trigger"
        >
          {resolvedChildren()}
        </CloseButton.Root>
      )}
      data-slot="tags-input-clear-trigger"
      class={triggerClassName()}
      {...others}
    />
  );
}

const TagsInputContext = TagsInputPrimitive.Context;

function TagsInputHiddenInput() {
  const field = useFieldContext();
  const tagsInput = useTagsInputContext();
  const initialValue = [...tagsInput().value];
  const initialInputValue = tagsInput().inputValue;
  let inputRef: HTMLInputElement | undefined;

  const hiddenInputProps = () => {
    const { defaultValue: _defaultValue, ...props } =
      tagsInput().getHiddenInputProps() as ComponentProps<'input'> & { defaultValue?: string };
    return props;
  };

  onMount(() => {
    const form = inputRef?.form;

    if (!form) return;

    const handleReset = () => {
      queueMicrotask(() => {
        tagsInput().setValue(initialValue);
        tagsInput().setInputValue(initialInputValue);
      });
    };

    form.addEventListener('reset', handleReset);
    onCleanup(() => form.removeEventListener('reset', handleReset));
  });

  return (
    <input
      {...hiddenInputProps()}
      ref={(element) => (inputRef = element)}
      value={tagsInput().valueAsString}
      readOnly
      aria-describedby={field?.().ariaDescribedby}
      data-slot="tags-input-hidden-input"
    />
  );
}

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

const TagsInput = Object.assign(TagsInputRoot, {
  Root: TagsInputRoot,
  RootProvider: TagsInputRootProvider,
  Label: TagsInputLabel,
  Control: TagsInputControl,
  Item: TagsInputItem,
  ItemContext: TagsInputPrimitive.ItemContext,
  ItemPreview: TagsInputItemPreview,
  ItemText: TagsInputItemText,
  ItemDeleteTrigger: TagsInputItemDeleteTrigger,
  ItemInput: TagsInputItemInput,
  Input: TagsInputInput,
  ClearTrigger: TagsInputClearTrigger,
  Context: TagsInputContext,
  Items: TagsInputItems,
});

export { TagsInput, useTagsInput, useTagsInputContext, useTagsInputItemContext };