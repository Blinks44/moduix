'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import {
  FileUpload as FileUploadPrimitive,
  useFileUpload,
  useFileUploadContext,
} from '@ark-ui/react/file-upload';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { CloseIcon, FileIcon, TrashIcon, UploadIcon } from '@/lib/moduix/icons/ui';
import { CloseButton } from '../close-button';
import styles from './FileUpload.module.css';

const FileUploadRoot = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.Root>,
  ComponentProps<typeof FileUploadPrimitive.Root>
>(function FileUploadRoot({ className, ...props }, ref) {
  return (
    <FileUploadPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="file-upload-root"
    />
  );
});

const FileUploadRootProvider = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.RootProvider>,
  ComponentProps<typeof FileUploadPrimitive.RootProvider>
>(function FileUploadRootProvider({ className, ...props }, ref) {
  return (
    <FileUploadPrimitive.RootProvider
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="file-upload-root-provider"
    />
  );
});

const FileUploadLabel = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.Label>,
  ComponentProps<typeof FileUploadPrimitive.Label>
>(function FileUploadLabel({ className, ...props }, ref) {
  return (
    <FileUploadPrimitive.Label
      ref={ref}
      className={clsx(styles.label, className)}
      {...props}
      data-slot="file-upload-label"
    />
  );
});

const FileUploadDropzone = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.Dropzone>,
  ComponentProps<typeof FileUploadPrimitive.Dropzone>
>(function FileUploadDropzone({ className, ...props }, ref) {
  return (
    <FileUploadPrimitive.Dropzone
      ref={ref}
      className={clsx(styles.dropzone, className)}
      {...props}
      data-slot="file-upload-dropzone"
    />
  );
});

function FileUploadDropzoneIcon({ className, children, ...props }: HTMLArkProps<'span'>) {
  return (
    <ark.span
      aria-hidden="true"
      className={clsx(styles.dropzoneIcon, className)}
      {...props}
      data-slot="file-upload-dropzone-icon"
    >
      {children ?? <UploadIcon />}
    </ark.span>
  );
}

const FileUploadTrigger = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.Trigger>,
  ComponentProps<typeof FileUploadPrimitive.Trigger>
>(function FileUploadTrigger({ className, ...props }, ref) {
  return (
    <FileUploadPrimitive.Trigger
      ref={ref}
      className={clsx(styles.trigger, className)}
      {...props}
      data-slot="file-upload-trigger"
    />
  );
});

const FileUploadItemGroup = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.ItemGroup>,
  ComponentProps<typeof FileUploadPrimitive.ItemGroup>
>(function FileUploadItemGroup({ className, ...props }, ref) {
  return (
    <FileUploadPrimitive.ItemGroup
      ref={ref}
      className={clsx(styles.itemGroup, className)}
      {...props}
      data-slot="file-upload-item-group"
    />
  );
});

const FileUploadItem = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.Item>,
  ComponentProps<typeof FileUploadPrimitive.Item>
>(function FileUploadItem({ className, ...props }, ref) {
  return (
    <FileUploadPrimitive.Item
      ref={ref}
      className={clsx(styles.item, className)}
      {...props}
      data-slot="file-upload-item"
    />
  );
});

const FileUploadItemPreview = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.ItemPreview>,
  ComponentProps<typeof FileUploadPrimitive.ItemPreview>
>(function FileUploadItemPreview({ className, ...props }, ref) {
  return (
    <FileUploadPrimitive.ItemPreview
      ref={ref}
      className={clsx(styles.itemPreview, className)}
      {...props}
      data-slot="file-upload-item-preview"
    />
  );
});

const FileUploadItemPreviewImage = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.ItemPreviewImage>,
  ComponentProps<typeof FileUploadPrimitive.ItemPreviewImage>
>(function FileUploadItemPreviewImage({ className, ...props }, ref) {
  return (
    <FileUploadPrimitive.ItemPreviewImage
      ref={ref}
      className={clsx(styles.itemPreviewImage, className)}
      {...props}
      data-slot="file-upload-item-preview-image"
    />
  );
});

function FileUploadItemPreviewIcon({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <FileIcon
      className={clsx(styles.itemPreviewIcon, className)}
      {...props}
      data-slot="file-upload-item-preview-icon"
    />
  );
}

function getFileTypeLabel(file: File) {
  const extension = file.name.split('.').pop();

  return extension ? extension.toUpperCase() : file.type || 'FILE';
}

function isImageFile(file: File) {
  return file.type.startsWith('image/');
}

const FileUploadItemName = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.ItemName>,
  ComponentProps<typeof FileUploadPrimitive.ItemName>
>(function FileUploadItemName({ className, ...props }, ref) {
  return (
    <FileUploadPrimitive.ItemName
      ref={ref}
      className={clsx(styles.itemName, className)}
      {...props}
      data-slot="file-upload-item-name"
    />
  );
});

const FileUploadItemSizeText = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.ItemSizeText>,
  ComponentProps<typeof FileUploadPrimitive.ItemSizeText>
>(function FileUploadItemSizeText({ className, ...props }, ref) {
  return (
    <FileUploadPrimitive.ItemSizeText
      ref={ref}
      className={clsx(styles.itemSizeText, className)}
      {...props}
      data-slot="file-upload-item-size-text"
    />
  );
});

function FileUploadItemMetadata({
  file,
  className,
  ...props
}: HTMLArkProps<'div'> & { file: File }) {
  return (
    <ark.div
      className={clsx(styles.itemMetadata, className)}
      {...props}
      data-slot="file-upload-item-metadata"
    >
      <ark.span>{getFileTypeLabel(file)}</ark.span>
      <FileUploadItemSizeText />
    </ark.div>
  );
}

const FileUploadItemDeleteTrigger = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.ItemDeleteTrigger>,
  ComponentProps<typeof FileUploadPrimitive.ItemDeleteTrigger>
>(function FileUploadItemDeleteTrigger({ className, children, ...props }, ref) {
  return (
    <FileUploadPrimitive.ItemDeleteTrigger
      ref={ref}
      className={clsx(styles.itemDeleteTrigger, className)}
      {...props}
      data-slot="file-upload-item-delete-trigger"
    >
      {children ?? <TrashIcon />}
    </FileUploadPrimitive.ItemDeleteTrigger>
  );
});

function FileUploadItems() {
  const { acceptedFiles } = useFileUploadContext();

  return acceptedFiles.map((file) => (
    <FileUploadItem key={`${file.name}-${file.size}`} file={file}>
      <FileUploadItemPreview>
        {isImageFile(file) ? <FileUploadItemPreviewImage /> : <FileUploadItemPreviewIcon />}
      </FileUploadItemPreview>
      <FileUploadItemName />
      <FileUploadItemMetadata file={file} />
      <FileUploadItemDeleteTrigger aria-label={`Remove ${file.name}`} />
    </FileUploadItem>
  ));
}

const FileUploadClearTrigger = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.ClearTrigger>,
  ComponentProps<typeof FileUploadPrimitive.ClearTrigger>
>(function FileUploadClearTrigger(
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
  const clearLabel = ariaLabel ?? (ariaLabelledBy == null ? 'Clear files' : undefined);
  const triggerClassName = clsx(
    styles.clearTrigger,
    children != null && styles.clearTriggerWithContent,
    className,
  );

  return (
    <FileUploadPrimitive.ClearTrigger
      ref={ref}
      asChild
      className={triggerClassName}
      aria-label={asChild ? clearLabel : undefined}
      aria-labelledby={asChild ? ariaLabelledBy : undefined}
      {...props}
      data-slot="file-upload-clear-trigger"
    >
      {asChild ? (
        children
      ) : (
        <CloseButton aria-label={clearLabel} aria-labelledby={ariaLabelledBy}>
          {children ?? <CloseIcon />}
        </CloseButton>
      )}
    </FileUploadPrimitive.ClearTrigger>
  );
});

const FileUpload = Object.assign(FileUploadRoot, {
  Root: FileUploadRoot,
  RootProvider: FileUploadRootProvider,
  Context: FileUploadPrimitive.Context,
  HiddenInput: FileUploadPrimitive.HiddenInput,
  Label: FileUploadLabel,
  Dropzone: FileUploadDropzone,
  DropzoneIcon: FileUploadDropzoneIcon,
  Trigger: FileUploadTrigger,
  ItemGroup: FileUploadItemGroup,
  Item: FileUploadItem,
  Items: FileUploadItems,
  ItemPreview: FileUploadItemPreview,
  ItemPreviewImage: FileUploadItemPreviewImage,
  ItemPreviewIcon: FileUploadItemPreviewIcon,
  ItemName: FileUploadItemName,
  ItemMetadata: FileUploadItemMetadata,
  ItemSizeText: FileUploadItemSizeText,
  ItemDeleteTrigger: FileUploadItemDeleteTrigger,
  ClearTrigger: FileUploadClearTrigger,
});

export { FileUpload, useFileUpload, useFileUploadContext };