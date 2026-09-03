import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import {
  FileUpload as FileUploadPrimitive,
  useFileUpload,
  useFileUploadContext,
} from '@ark-ui/solid/file-upload';
import { clsx } from 'clsx';
import { For, children as resolveChildren, splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { CloseIcon, FileIcon, TrashIcon, UploadIcon } from '@/lib/moduix/icons/ui/Icons';
import { CloseButton } from '../close-button';
import styles from './FileUpload.module.css';

function FileUploadRoot(props: ComponentProps<typeof FileUploadPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <FileUploadPrimitive.Root
      asChild={local.asChild}
      data-slot="file-upload-root"
      class={clsx(styles.root, local.class)}
      {...others}
    >
      {local.children}
      <FileUploadPrimitive.HiddenInput data-slot="file-upload-hidden-input" />
    </FileUploadPrimitive.Root>
  );
}

function FileUploadRootProvider(props: ComponentProps<typeof FileUploadPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <FileUploadPrimitive.RootProvider
      asChild={local.asChild}
      data-slot="file-upload-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
    >
      {local.children}
      <FileUploadPrimitive.HiddenInput data-slot="file-upload-hidden-input" />
    </FileUploadPrimitive.RootProvider>
  );
}

function FileUploadLabel(props: ComponentProps<typeof FileUploadPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.Label
      data-slot="file-upload-label"
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

function FileUploadDropzone(props: ComponentProps<typeof FileUploadPrimitive.Dropzone>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.Dropzone
      data-slot="file-upload-dropzone"
      class={clsx(styles.dropzone, local.class)}
      {...others}
    />
  );
}

function FileUploadDropzoneIcon(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = resolveChildren(() => local.children);

  return (
    <ark.span
      aria-hidden="true"
      data-slot="file-upload-dropzone-icon"
      class={clsx(styles.dropzoneIcon, local.class)}
      {...others}
    >
      {resolvedChildren() ?? <UploadIcon />}
    </ark.span>
  );
}

function FileUploadTrigger(props: ComponentProps<typeof FileUploadPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.Trigger
      data-slot="file-upload-trigger"
      class={clsx(styles.trigger, local.class)}
      {...others}
    />
  );
}

function FileUploadItemGroup(props: ComponentProps<typeof FileUploadPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.ItemGroup
      data-slot="file-upload-item-group"
      class={clsx(styles.itemGroup, local.class)}
      {...others}
    />
  );
}

function FileUploadItem(props: ComponentProps<typeof FileUploadPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.Item
      data-slot="file-upload-item"
      class={clsx(styles.item, local.class)}
      {...others}
    />
  );
}

function FileUploadItemPreview(props: ComponentProps<typeof FileUploadPrimitive.ItemPreview>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.ItemPreview
      data-slot="file-upload-item-preview"
      class={clsx(styles.itemPreview, local.class)}
      {...others}
    />
  );
}

function FileUploadItemPreviewImage(
  props: ComponentProps<typeof FileUploadPrimitive.ItemPreviewImage>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.ItemPreviewImage
      data-slot="file-upload-item-preview-image"
      class={clsx(styles.itemPreviewImage, local.class)}
      {...others}
    />
  );
}

function FileUploadItemPreviewIcon(props: ComponentProps<'svg'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileIcon
      data-slot="file-upload-item-preview-icon"
      class={clsx(styles.itemPreviewIcon, local.class)}
      {...others}
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

function FileUploadItemName(props: ComponentProps<typeof FileUploadPrimitive.ItemName>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.ItemName
      data-slot="file-upload-item-name"
      class={clsx(styles.itemName, local.class)}
      {...others}
    />
  );
}

function FileUploadItemSizeText(props: ComponentProps<typeof FileUploadPrimitive.ItemSizeText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.ItemSizeText
      data-slot="file-upload-item-size-text"
      class={clsx(styles.itemSizeText, local.class)}
      {...others}
    />
  );
}

function FileUploadItemMetadata(props: HTMLArkProps<'div'> & { file: File }) {
  const [local, others] = splitProps(props, ['class', 'file']);

  return (
    <ark.div
      data-slot="file-upload-item-metadata"
      class={clsx(styles.itemMetadata, local.class)}
      {...others}
    >
      <ark.span>{getFileTypeLabel(local.file)}</ark.span>
      <FileUploadItemSizeText />
    </ark.div>
  );
}

function FileUploadItemDeleteTrigger(
  props: ComponentProps<typeof FileUploadPrimitive.ItemDeleteTrigger>,
) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = resolveChildren(() => local.children);

  return (
    <FileUploadPrimitive.ItemDeleteTrigger
      data-slot="file-upload-item-delete-trigger"
      class={clsx(styles.itemDeleteTrigger, local.class)}
      {...others}
    >
      {resolvedChildren() ?? <TrashIcon />}
    </FileUploadPrimitive.ItemDeleteTrigger>
  );
}

function FileUploadItems() {
  const fileUpload = useFileUploadContext();

  return (
    <For each={fileUpload().acceptedFiles}>
      {(file) => (
        <FileUploadItem file={file}>
          {isImageFile(file) ? (
            <FileUploadItemPreview>
              <FileUploadItemPreviewImage />
            </FileUploadItemPreview>
          ) : (
            <FileUploadItemPreview>
              <FileUploadItemPreviewIcon />
            </FileUploadItemPreview>
          )}
          <FileUploadItemName />
          <FileUploadItemMetadata file={file} />
          <FileUploadItemDeleteTrigger aria-label={`Remove ${file.name}`} />
        </FileUploadItem>
      )}
    </For>
  );
}

function FileUploadClearTrigger(props: ComponentProps<typeof FileUploadPrimitive.ClearTrigger>) {
  const [local, others] = splitProps(props, [
    'aria-label',
    'aria-labelledby',
    'asChild',
    'children',
    'class',
  ]);
  const resolvedChildren = resolveChildren(() => local.children);
  const clearLabel = () =>
    local['aria-label'] ?? (local['aria-labelledby'] == null ? 'Clear files' : undefined);
  const triggerClass = () =>
    clsx(
      styles.clearTrigger,
      local.children != null && styles.clearTriggerWithContent,
      local.class,
    );

  if (local.asChild) {
    return (
      <FileUploadPrimitive.ClearTrigger
        asChild={local.asChild}
        data-slot="file-upload-clear-trigger"
        class={triggerClass()}
        aria-label={clearLabel()}
        aria-labelledby={local['aria-labelledby']}
        {...others}
      >
        {resolvedChildren()}
      </FileUploadPrimitive.ClearTrigger>
    );
  }

  return (
    <FileUploadPrimitive.ClearTrigger
      asChild={(triggerProps) => (
        <CloseButton.Root
          {...triggerProps()}
          aria-label={clearLabel()}
          aria-labelledby={local['aria-labelledby']}
        >
          {resolvedChildren() ?? <CloseIcon />}
        </CloseButton.Root>
      )}
      data-slot="file-upload-clear-trigger"
      class={triggerClass()}
      {...others}
    />
  );
}

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
  ItemPreviewIcon: FileUploadItemPreviewIcon,
  ItemName: FileUploadItemName,
  ItemMetadata: FileUploadItemMetadata,
  ItemSizeText: FileUploadItemSizeText,
  ItemDeleteTrigger: FileUploadItemDeleteTrigger,
  ClearTrigger: FileUploadClearTrigger,
});

export { FileUpload, useFileUpload, useFileUploadContext };