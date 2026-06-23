import type { ComponentProps, ComponentRef } from 'react';
import {
  TagsInput as TagsInputPrimitive,
  useTagsInput,
  useTagsInputContext,
  useTagsInputItemContext,
} from '@ark-ui/react/tags-input';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
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
      className={clsx(styles.root, normalizeClassName(className))}
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
      className={clsx(styles.root, normalizeClassName(className))}
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
      className={clsx(styles.label, normalizeClassName(className))}
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
      className={clsx(styles.control, normalizeClassName(className))}
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
      className={clsx(styles.item, normalizeClassName(className))}
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
      className={clsx(styles.itemPreview, normalizeClassName(className))}
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
      className={clsx(styles.itemText, normalizeClassName(className))}
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
      className={clsx(styles.itemDeleteTrigger, normalizeClassName(className))}
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
      className={clsx(styles.itemInput, normalizeClassName(className))}
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
      className={clsx(styles.input, normalizeClassName(className))}
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
  const triggerClassName = clsx(styles.clearTrigger, normalizeClassName(className));

  if (asChild || children != null) {
    return (
      <TagsInputPrimitive.ClearTrigger
        ref={ref}
        asChild={asChild}
        data-slot="tags-input-clear-trigger"
        className={triggerClassName}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...props}
      >
        {children}
      </TagsInputPrimitive.ClearTrigger>
    );
  }

  return (
    <TagsInputPrimitive.ClearTrigger
      ref={ref}
      asChild
      data-slot="tags-input-clear-trigger"
      className={triggerClassName}
      {...props}
    >
      <CloseButton.Root
        aria-label={ariaLabel ?? (ariaLabelledBy == null ? 'Clear tags' : undefined)}
        aria-labelledby={ariaLabelledBy}
      />
    </TagsInputPrimitive.ClearTrigger>
  );
});

const TagsInputHiddenInput = forwardRef<
  ComponentRef<typeof TagsInputPrimitive.HiddenInput>,
  ComponentProps<typeof TagsInputPrimitive.HiddenInput>
>(function TagsInputHiddenInput(props, ref) {
  return (
    <TagsInputPrimitive.HiddenInput ref={ref} data-slot="tags-input-hidden-input" {...props} />
  );
});

const TagsInputContext = TagsInputPrimitive.Context;
const TagsInputItemContext = TagsInputPrimitive.ItemContext;

const TagsInput = Object.assign(TagsInputRoot, {
  Root: TagsInputRoot,
  RootProvider: TagsInputRootProvider,
  Label: TagsInputLabel,
  Control: TagsInputControl,
  Item: TagsInputItem,
  ItemPreview: TagsInputItemPreview,
  ItemText: TagsInputItemText,
  ItemDeleteTrigger: TagsInputItemDeleteTrigger,
  ItemInput: TagsInputItemInput,
  Input: TagsInputInput,
  ClearTrigger: TagsInputClearTrigger,
  HiddenInput: TagsInputHiddenInput,
  Context: TagsInputContext,
  ItemContext: TagsInputItemContext,
});

export { TagsInput, useTagsInput, useTagsInputContext, useTagsInputItemContext };
export type {
  TagsInputFocusOutsideEvent,
  TagsInputHighlightChangeDetails,
  TagsInputInputValueChangeDetails,
  TagsInputInteractOutsideEvent,
  TagsInputPointerDownOutsideEvent,
  TagsInputValidityChangeDetails,
  TagsInputValueChangeDetails,
  UseTagsInputContext,
  UseTagsInputItemContext,
  UseTagsInputProps,
  UseTagsInputReturn,
} from '@ark-ui/react/tags-input';