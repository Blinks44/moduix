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
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="file-upload-root"
    >
      {local.children}
    </FileUploadPrimitive.Root>
  );
}

function FileUploadRootProvider(props: ComponentProps<typeof FileUploadPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <FileUploadPrimitive.RootProvider
      asChild={local.asChild}
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="file-upload-root-provider"
    >
      {local.children}
    </FileUploadPrimitive.RootProvider>
  );
}

function FileUploadLabel(props: ComponentProps<typeof FileUploadPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.Label
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="file-upload-label"
    />
  );
}

function FileUploadDropzone(props: ComponentProps<typeof FileUploadPrimitive.Dropzone>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.Dropzone
      class={clsx(styles.dropzone, local.class)}
      {...others}
      data-slot="file-upload-dropzone"
    />
  );
}

function FileUploadDropzoneIcon(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = resolveChildren(() => local.children);

  return (
    <ark.span
      aria-hidden="true"
      class={clsx(styles.dropzoneIcon, local.class)}
      {...others}
      data-slot="file-upload-dropzone-icon"
    >
      {resolvedChildren() ?? <UploadIcon />}
    </ark.span>
  );
}

function FileUploadTrigger(props: ComponentProps<typeof FileUploadPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.Trigger
      class={clsx(styles.trigger, local.class)}
      {...others}
      data-slot="file-upload-trigger"
    />
  );
}

function FileUploadItemGroup(props: ComponentProps<typeof FileUploadPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.ItemGroup
      class={clsx(styles.itemGroup, local.class)}
      {...others}
      data-slot="file-upload-item-group"
    />
  );
}

function FileUploadItem(props: ComponentProps<typeof FileUploadPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.Item
      class={clsx(styles.item, local.class)}
      {...others}
      data-slot="file-upload-item"
    />
  );
}

function FileUploadItemPreview(props: ComponentProps<typeof FileUploadPrimitive.ItemPreview>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.ItemPreview
      class={clsx(styles.itemPreview, local.class)}
      {...others}
      data-slot="file-upload-item-preview"
    />
  );
}

function FileUploadItemPreviewImage(
  props: ComponentProps<typeof FileUploadPrimitive.ItemPreviewImage>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.ItemPreviewImage
      class={clsx(styles.itemPreviewImage, local.class)}
      {...others}
      data-slot="file-upload-item-preview-image"
    />
  );
}

function FileUploadItemPreviewIcon(props: ComponentProps<'svg'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileIcon
      class={clsx(styles.itemPreviewIcon, local.class)}
      {...others}
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

function FileUploadItemName(props: ComponentProps<typeof FileUploadPrimitive.ItemName>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.ItemName
      class={clsx(styles.itemName, local.class)}
      {...others}
      data-slot="file-upload-item-name"
    />
  );
}

function FileUploadItemSizeText(props: ComponentProps<typeof FileUploadPrimitive.ItemSizeText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.ItemSizeText
      class={clsx(styles.itemSizeText, local.class)}
      {...others}
      data-slot="file-upload-item-size-text"
    />
  );
}

function FileUploadItemMetadata(props: HTMLArkProps<'div'> & { file: File }) {
  const [local, others] = splitProps(props, ['class', 'file']);

  return (
    <ark.div
      class={clsx(styles.itemMetadata, local.class)}
      {...others}
      data-slot="file-upload-item-metadata"
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
      class={clsx(styles.itemDeleteTrigger, local.class)}
      {...others}
      data-slot="file-upload-item-delete-trigger"
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
        class={triggerClass()}
        aria-label={clearLabel()}
        aria-labelledby={local['aria-labelledby']}
        {...others}
        data-slot="file-upload-clear-trigger"
      >
        {resolvedChildren()}
      </FileUploadPrimitive.ClearTrigger>
    );
  }

  return (
    <FileUploadPrimitive.ClearTrigger
      asChild={(triggerProps) => (
        <CloseButton
          {...triggerProps()}
          aria-label={clearLabel()}
          aria-labelledby={local['aria-labelledby']}
        >
          {resolvedChildren() ?? <CloseIcon />}
        </CloseButton>
      )}
      class={triggerClass()}
      {...others}
      data-slot="file-upload-clear-trigger"
    />
  );
}

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