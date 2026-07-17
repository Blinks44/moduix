import {
  FileUpload as FileUploadPrimitive,
  useFileUpload,
  useFileUploadContext,
} from '@ark-ui/react/file-upload';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ReactElement, ReactNode } from 'react';
import { Children, cloneElement, forwardRef } from 'react';
import { CloseIcon, TrashIcon, UploadIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './FileUpload.module.css';

const FileUploadRoot = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.Root>,
  ComponentProps<typeof FileUploadPrimitive.Root>
>(function FileUploadRoot({ asChild, children, className, ...props }, ref) {
  return (
    <FileUploadPrimitive.Root
      ref={ref}
      asChild={asChild}
      data-slot="file-upload-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    >
      {withHiddenInput(children, asChild)}
    </FileUploadPrimitive.Root>
  );
});

const FileUploadRootProvider = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.RootProvider>,
  ComponentProps<typeof FileUploadPrimitive.RootProvider>
>(function FileUploadRootProvider({ asChild, children, className, ...props }, ref) {
  return (
    <FileUploadPrimitive.RootProvider
      ref={ref}
      asChild={asChild}
      data-slot="file-upload-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    >
      {withHiddenInput(children, asChild)}
    </FileUploadPrimitive.RootProvider>
  );
});

const FileUploadLabel = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.Label>,
  ComponentProps<typeof FileUploadPrimitive.Label>
>(function FileUploadLabel({ className, ...props }, ref) {
  return (
    <FileUploadPrimitive.Label
      ref={ref}
      data-slot="file-upload-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
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
      data-slot="file-upload-dropzone"
      className={clsx(styles.dropzone, normalizeClassName(className))}
      {...props}
    />
  );
});

function FileUploadDropzoneIcon({ className, children, ...props }: ComponentProps<'span'>) {
  return (
    <span
      aria-hidden="true"
      data-slot="file-upload-dropzone-icon"
      className={clsx(styles.dropzoneIcon, normalizeClassName(className))}
      {...props}
    >
      {children ?? <UploadIcon />}
    </span>
  );
}

const FileUploadTrigger = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.Trigger>,
  ComponentProps<typeof FileUploadPrimitive.Trigger>
>(function FileUploadTrigger({ className, ...props }, ref) {
  return (
    <FileUploadPrimitive.Trigger
      ref={ref}
      data-slot="file-upload-trigger"
      className={clsx(styles.trigger, normalizeClassName(className))}
      {...props}
    />
  );
});

function withHiddenInput(children: ReactNode, asChild?: boolean) {
  const hiddenInput = <FileUploadPrimitive.HiddenInput data-slot="file-upload-hidden-input" />;

  if (!asChild) {
    return (
      <>
        {children}
        {hiddenInput}
      </>
    );
  }

  const child = Children.only(children) as ReactElement<{ children?: ReactNode }>;

  return cloneElement(child, {}, child.props.children, hiddenInput);
}

const FileUploadItemGroup = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.ItemGroup>,
  ComponentProps<typeof FileUploadPrimitive.ItemGroup>
>(function FileUploadItemGroup({ className, ...props }, ref) {
  return (
    <FileUploadPrimitive.ItemGroup
      ref={ref}
      data-slot="file-upload-item-group"
      className={clsx(styles.itemGroup, normalizeClassName(className))}
      {...props}
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
      data-slot="file-upload-item"
      className={clsx(styles.item, normalizeClassName(className))}
      {...props}
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
      data-slot="file-upload-item-preview"
      className={clsx(styles.itemPreview, normalizeClassName(className))}
      {...props}
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
      data-slot="file-upload-item-preview-image"
      className={clsx(styles.itemPreviewImage, normalizeClassName(className))}
      {...props}
    />
  );
});

const FileUploadItemName = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.ItemName>,
  ComponentProps<typeof FileUploadPrimitive.ItemName>
>(function FileUploadItemName({ className, ...props }, ref) {
  return (
    <FileUploadPrimitive.ItemName
      ref={ref}
      data-slot="file-upload-item-name"
      className={clsx(styles.itemName, normalizeClassName(className))}
      {...props}
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
      data-slot="file-upload-item-size-text"
      className={clsx(styles.itemSizeText, normalizeClassName(className))}
      {...props}
    />
  );
});

const FileUploadItemDeleteTrigger = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.ItemDeleteTrigger>,
  ComponentProps<typeof FileUploadPrimitive.ItemDeleteTrigger>
>(function FileUploadItemDeleteTrigger({ className, children, ...props }, ref) {
  return (
    <FileUploadPrimitive.ItemDeleteTrigger
      ref={ref}
      data-slot="file-upload-item-delete-trigger"
      className={clsx(styles.itemDeleteTrigger, normalizeClassName(className))}
      {...props}
    >
      {children ?? <TrashIcon />}
    </FileUploadPrimitive.ItemDeleteTrigger>
  );
});

function FileUploadItems() {
  const { acceptedFiles } = useFileUploadContext();

  return acceptedFiles.map((file) => (
    <FileUploadItem key={`${file.name}-${file.size}`} file={file}>
      <FileUploadItemName />
      <FileUploadItemDeleteTrigger aria-label={`Remove ${file.name}`} />
    </FileUploadItem>
  ));
}

const FileUploadClearTrigger = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.ClearTrigger>,
  ComponentProps<typeof FileUploadPrimitive.ClearTrigger>
>(function FileUploadClearTrigger({ className, children, ...props }, ref) {
  return (
    <FileUploadPrimitive.ClearTrigger
      ref={ref}
      data-slot="file-upload-clear-trigger"
      className={clsx(styles.clearTrigger, normalizeClassName(className))}
      {...props}
    >
      {children ?? <CloseIcon />}
    </FileUploadPrimitive.ClearTrigger>
  );
});

const FileUpload = Object.assign(FileUploadRoot, {
  Root: FileUploadRoot,
  RootProvider: FileUploadRootProvider,
  Context: FileUploadPrimitive.Context,
  Label: FileUploadLabel,
  Dropzone: FileUploadDropzone,
  DropzoneIcon: FileUploadDropzoneIcon,
  Trigger: FileUploadTrigger,
  ItemGroup: FileUploadItemGroup,
  Item: FileUploadItem,
  Items: FileUploadItems,
  ItemPreview: FileUploadItemPreview,
  ItemPreviewImage: FileUploadItemPreviewImage,
  ItemName: FileUploadItemName,
  ItemSizeText: FileUploadItemSizeText,
  ItemDeleteTrigger: FileUploadItemDeleteTrigger,
  ClearTrigger: FileUploadClearTrigger,
});

export { FileUpload, useFileUpload, useFileUploadContext };