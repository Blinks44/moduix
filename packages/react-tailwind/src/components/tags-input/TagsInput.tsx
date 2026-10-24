'use client';

import {
  TagsInput as TagsInputPrimitive,
  useTagsInput,
  useTagsInputContext,
  useTagsInputItemContext,
} from '@ark-ui/react/tags-input';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { CloseButton } from '../close-button';

const rootClass =
  'flex w-96 max-w-full flex-col gap-1 text-foreground data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

const TagsInput = forwardRef<
  ComponentRef<typeof TagsInputPrimitive.Root>,
  ComponentProps<typeof TagsInputPrimitive.Root>
>(function TagsInput({ className, ...props }, ref) {
  return (
    <TagsInputPrimitive.Root
      ref={ref}
      className={cn(rootClass, className)}
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
      className={cn(rootClass, className)}
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
      className={cn('inline-flex items-center gap-1 text-sm leading-5 font-medium', className)}
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
      className={cn(
        'group flex min-h-control-md w-full flex-wrap items-center gap-1 rounded-md border border-border bg-background px-2 py-[0.3125rem] outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out data-disabled:pointer-events-none data-focus:outline-ring data-invalid:border-destructive data-invalid:data-focus:outline-destructive',
        className,
      )}
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
      className={cn('contents', className)}
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
      className={cn(
        'inline-flex min-h-control-xs max-w-full min-w-0 items-center gap-1 rounded-full border border-transparent bg-secondary px-2 py-0.5 text-xs leading-4 font-medium text-secondary-foreground transition-shadow duration-normal ease-in-out data-highlighted:ring-1 data-highlighted:ring-ring',
        className,
      )}
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
      className={cn('min-w-0 truncate', className)}
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
      className={cn(
        'inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-inherit outline-0 transition-[background-color,box-shadow] duration-normal ease-in-out group-data-readonly:hidden focus-visible:ring-1 focus-visible:ring-ring data-disabled:pointer-events-none data-disabled:opacity-disabled [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0 [:is([data-slot=tags-input-root],[data-slot=tags-input-root-provider])[data-disabled]_&]:opacity-100 [@media(hover:hover)]:hover:bg-current/12',
        className,
      )}
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
      className={cn(
        'h-control-xs min-w-28 shrink grow-0 basis-28 border-0 bg-transparent px-1 text-sm leading-5 text-inherit outline-0 placeholder:text-muted-foreground',
        className,
      )}
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
      className={cn(
        'h-control-xs min-w-28 shrink grow basis-28 border-0 bg-transparent px-1 text-sm leading-5 text-inherit outline-0 placeholder:text-muted-foreground data-readonly:hidden',
        className,
      )}
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
      className={cn(
        asChild
          ? 'ms-auto data-readonly:hidden'
          : 'ms-auto size-control-xs focus-visible:outline-1 focus-visible:outline-offset-1 data-readonly:hidden [:is([data-slot=tags-input-root],[data-slot=tags-input-root-provider])[data-disabled]_&]:opacity-100',
        className,
      )}
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