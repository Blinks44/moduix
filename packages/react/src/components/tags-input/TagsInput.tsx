'use client';

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

const TagsInput = forwardRef<
  ComponentRef<typeof TagsInputPrimitive.Root>,
  ComponentProps<typeof TagsInputPrimitive.Root>
>(function TagsInput({ className, ...props }, ref) {
  return (
    <TagsInputPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="tags-input-root"
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
      className={clsx(styles.root, className)}
      {...props}
      data-slot="tags-input-root-provider"
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
      className={clsx(styles.label, className)}
      {...props}
      data-slot="tags-input-label"
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
      className={clsx(styles.control, className)}
      {...props}
      data-slot="tags-input-control"
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
      className={clsx(styles.item, className)}
      {...props}
      data-slot="tags-input-item"
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
      className={clsx(styles.itemPreview, className)}
      {...props}
      data-slot="tags-input-item-preview"
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
      className={clsx(styles.itemText, className)}
      {...props}
      data-slot="tags-input-item-text"
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
      className={clsx(styles.itemDeleteTrigger, className)}
      {...props}
      data-slot="tags-input-item-delete-trigger"
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
      className={clsx(styles.itemInput, className)}
      {...props}
      data-slot="tags-input-item-input"
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
      className={clsx(styles.input, className)}
      {...props}
      data-slot="tags-input-input"
    />
  );
});

const TagsInputClearTrigger = forwardRef<
  ComponentRef<typeof TagsInputPrimitive.ClearTrigger>,
  ComponentProps<typeof TagsInputPrimitive.ClearTrigger>
>(function TagsInputClearTrigger({ asChild, className, children, ...props }, ref) {
  // Ark merges its label, anatomy, and state props onto the CloseButton host.
  return (
    <TagsInputPrimitive.ClearTrigger
      ref={ref}
      asChild
      className={clsx(styles.clearTrigger, className)}
      {...props}
      data-slot="tags-input-clear-trigger"
    >
      {asChild ? children : <CloseButton>{children}</CloseButton>}
    </TagsInputPrimitive.ClearTrigger>
  );
});

const TagsInputHiddenInput = TagsInputPrimitive.HiddenInput;
const TagsInputContext = TagsInputPrimitive.Context;
const TagsInputItemContext = TagsInputPrimitive.ItemContext;

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
} from '@ark-ui/react/tags-input';