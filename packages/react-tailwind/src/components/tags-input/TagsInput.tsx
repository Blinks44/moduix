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

const TagsInput = forwardRef<
  ComponentRef<typeof TagsInputPrimitive.Root>,
  ComponentProps<typeof TagsInputPrimitive.Root>
>(function TagsInput({ className, ...props }, ref) {
  return (
    <TagsInputPrimitive.Root
      ref={ref}
      className={cn(
        'flex w-full max-w-96 flex-col gap-1 text-foreground data-disabled:opacity-50',
        className,
      )}
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
      className={cn(
        'flex w-full max-w-96 flex-col gap-1 text-foreground data-disabled:opacity-50',
        className,
      )}
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
      className={cn(
        'inline-flex items-center gap-1 text-sm leading-5 font-medium text-foreground data-disabled:opacity-50',
        className,
      )}
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
        'group flex min-h-control-md w-full flex-wrap items-center gap-1 rounded-md border border-border bg-background px-2 py-[0.3125rem] text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color,opacity] duration-200 ease-in-out data-disabled:pointer-events-none data-focus:outline-ring data-invalid:border-destructive data-invalid:data-focus:outline-destructive data-readonly:bg-background data-readonly:text-foreground motion-reduce:transition-none',
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
        'inline-flex min-h-control-xs max-w-full min-w-0 items-center gap-1 rounded-full border border-transparent bg-secondary px-2 py-0.5 text-xs leading-4 font-medium text-secondary-foreground transition-[border-color,background-color,color,box-shadow] duration-200 ease-in-out data-disabled:opacity-50 data-highlighted:ring-1 data-highlighted:ring-ring motion-reduce:transition-none',
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
        'inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 text-inherit outline-0 transition-[background-color,color,opacity,box-shadow] duration-200 ease-in-out group-data-readonly:hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none [&>svg]:pointer-events-none [&>svg]:size-2.5 [&>svg]:shrink-0 [@media(hover:hover)]:hover:bg-current/12',
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
        'h-control-xs min-w-28 shrink grow-0 basis-28 border-0 bg-transparent px-1 text-sm leading-5 text-inherit outline-0 placeholder:text-muted-foreground read-only:cursor-default data-readonly:cursor-default',
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
        'h-control-xs min-w-28 shrink grow basis-28 border-0 bg-transparent px-1 text-sm leading-5 text-inherit outline-0 placeholder:text-muted-foreground read-only:cursor-default data-readonly:hidden data-readonly:cursor-default',
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
  const clearTriggerLabel = useTagsInputContext().getClearTriggerProps()['aria-label'];

  return (
    <TagsInputPrimitive.ClearTrigger
      ref={ref}
      asChild
      className={cn(
        asChild
          ? 'ms-auto shrink-0 self-center data-readonly:hidden'
          : 'ms-auto size-control-xs shrink-0 self-center focus-visible:outline-1 data-readonly:hidden motion-reduce:transition-none [&>svg]:size-3',
        className,
      )}
      aria-label={asChild ? ariaLabel : undefined}
      aria-labelledby={asChild ? ariaLabelledBy : undefined}
      {...props}
      data-slot="tags-input-clear-trigger"
    >
      {asChild ? (
        children
      ) : (
        <CloseButton
          aria-label={ariaLabel ?? clearTriggerLabel}
          aria-labelledby={ariaLabelledBy}
          data-part="clear-trigger"
          data-scope="tags-input"
          data-slot="tags-input-clear-trigger"
        >
          {children}
        </CloseButton>
      )}
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