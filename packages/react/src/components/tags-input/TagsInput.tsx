import {
  TagsInput as TagsInputPrimitive,
  useTagsInput,
  useTagsInputContext,
  useTagsInputItemContext,
} from '@ark-ui/react/tags-input';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { CloseButton } from '../close-button';
import styles from './TagsInput.module.css';

const TagsInputRoot = forwardRef<
  ComponentRef<typeof TagsInputPrimitive.Root>,
  ComponentProps<typeof TagsInputPrimitive.Root>
>(function TagsInputRoot({ className, ...props }, ref) {
  return (
    <TagsInputPrimitive.Root
      ref={ref}
      data-slot="tags-input-root"
      className={clsx(styles.root, className)}
      {...props}
    />
  );
});

const TagsInputRootProvider = forwardRef<
  ComponentRef<typeof TagsInputPrimitive.RootProvider>,
  ComponentProps<typeof TagsInputPrimitive.RootProvider>
>(function TagsInputRootProvider({ className, ...props }, ref) {
  return (
    <TagsInputPrimitive.RootProvider
      ref={ref}
      data-slot="tags-input-root-provider"
      className={clsx(styles.root, className)}
      {...props}
    />
  );
});

const TagsInputLabel = forwardRef<
  ComponentRef<typeof TagsInputPrimitive.Label>,
  ComponentProps<typeof TagsInputPrimitive.Label>
>(function TagsInputLabel({ className, ...props }, ref) {
  return (
    <TagsInputPrimitive.Label
      ref={ref}
      data-slot="tags-input-label"
      className={clsx(styles.label, className)}
      {...props}
    />
  );
});

const TagsInputControl = forwardRef<
  ComponentRef<typeof TagsInputPrimitive.Control>,
  ComponentProps<typeof TagsInputPrimitive.Control>
>(function TagsInputControl({ className, ...props }, ref) {
  return (
    <TagsInputPrimitive.Control
      ref={ref}
      data-slot="tags-input-control"
      className={clsx(styles.control, className)}
      {...props}
    />
  );
});

const TagsInputItem = forwardRef<
  ComponentRef<typeof TagsInputPrimitive.Item>,
  ComponentProps<typeof TagsInputPrimitive.Item>
>(function TagsInputItem({ className, ...props }, ref) {
  return (
    <TagsInputPrimitive.Item
      ref={ref}
      data-slot="tags-input-item"
      className={clsx(styles.item, className)}
      {...props}
    />
  );
});

const TagsInputItemPreview = forwardRef<
  ComponentRef<typeof TagsInputPrimitive.ItemPreview>,
  ComponentProps<typeof TagsInputPrimitive.ItemPreview>
>(function TagsInputItemPreview({ className, ...props }, ref) {
  return (
    <TagsInputPrimitive.ItemPreview
      ref={ref}
      data-slot="tags-input-item-preview"
      className={clsx(styles.itemPreview, className)}
      {...props}
    />
  );
});

const TagsInputItemText = forwardRef<
  ComponentRef<typeof TagsInputPrimitive.ItemText>,
  ComponentProps<typeof TagsInputPrimitive.ItemText>
>(function TagsInputItemText({ className, ...props }, ref) {
  return (
    <TagsInputPrimitive.ItemText
      ref={ref}
      data-slot="tags-input-item-text"
      className={clsx(styles.itemText, className)}
      {...props}
    />
  );
});

const TagsInputItemDeleteTrigger = forwardRef<
  ComponentRef<typeof TagsInputPrimitive.ItemDeleteTrigger>,
  ComponentProps<typeof TagsInputPrimitive.ItemDeleteTrigger>
>(function TagsInputItemDeleteTrigger({ className, children, ...props }, ref) {
  return (
    <TagsInputPrimitive.ItemDeleteTrigger
      ref={ref}
      data-slot="tags-input-item-delete-trigger"
      className={clsx(styles.itemDeleteTrigger, className)}
      {...props}
    >
      {children ?? <CloseIcon />}
    </TagsInputPrimitive.ItemDeleteTrigger>
  );
});

const TagsInputItemInput = forwardRef<
  ComponentRef<typeof TagsInputPrimitive.ItemInput>,
  ComponentProps<typeof TagsInputPrimitive.ItemInput>
>(function TagsInputItemInput({ className, ...props }, ref) {
  return (
    <TagsInputPrimitive.ItemInput
      ref={ref}
      data-slot="tags-input-item-input"
      className={clsx(styles.itemInput, className)}
      {...props}
    />
  );
});

const TagsInputInput = forwardRef<
  ComponentRef<typeof TagsInputPrimitive.Input>,
  ComponentProps<typeof TagsInputPrimitive.Input>
>(function TagsInputInput({ className, ...props }, ref) {
  return (
    <TagsInputPrimitive.Input
      ref={ref}
      data-slot="tags-input-input"
      className={clsx(styles.input, className)}
      {...props}
    />
  );
});

const TagsInputClearTrigger = forwardRef<
  ComponentRef<typeof TagsInputPrimitive.ClearTrigger>,
  ComponentProps<typeof TagsInputPrimitive.ClearTrigger>
>(function TagsInputClearTrigger(
  {
    asChild,
    className,
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  },
  ref,
) {
  const triggerClassName = clsx(styles.clearTrigger, className);
  const clearTriggerLabel = useTagsInputContext().getClearTriggerProps()['aria-label'];

  return (
    <TagsInputPrimitive.ClearTrigger
      ref={ref}
      asChild
      data-slot="tags-input-clear-trigger"
      className={triggerClassName}
      aria-label={asChild ? ariaLabel : undefined}
      aria-labelledby={asChild ? ariaLabelledBy : undefined}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <CloseButton.Root
          aria-label={ariaLabel ?? clearTriggerLabel}
          aria-labelledby={ariaLabelledBy}
          data-part="clear-trigger"
          data-scope="tags-input"
          data-slot="tags-input-clear-trigger"
        >
          {children}
        </CloseButton.Root>
      )}
    </TagsInputPrimitive.ClearTrigger>
  );
});

const TagsInputContext = TagsInputPrimitive.Context;

function TagsInputItems() {
  return (
    <TagsInputContext>
      {(tagsInput) =>
        tagsInput.value.map((value, index) => (
          <TagsInputItem key={`${value}-${index}`} index={index} value={value}>
            <TagsInputItemPreview>
              <TagsInputItemText>{value}</TagsInputItemText>
              <TagsInputItemDeleteTrigger />
            </TagsInputItemPreview>
            <TagsInputItemInput />
          </TagsInputItem>
        ))
      }
    </TagsInputContext>
  );
}

const TagsInput = Object.assign(TagsInputRoot, {
  Root: TagsInputRoot,
  RootProvider: TagsInputRootProvider,
  HiddenInput: TagsInputPrimitive.HiddenInput,
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