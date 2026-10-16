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
import { FileIcon, TrashIcon, UploadIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './FileUpload.module.css';

function FileUpload(props: ComponentProps<typeof FileUploadPrimitive.Root>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <FileUploadPrimitive.Root
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="file-upload-root"
    >
      {local.children}
    </FileUploadPrimitive.Root>
  );
}

function FileUploadRootProvider(props: ComponentProps<typeof FileUploadPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <FileUploadPrimitive.RootProvider
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
  return <FileUploadPrimitive.Trigger {...props} data-slot="file-upload-trigger" />;
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
  const extension = file.name.includes('.') ? file.name.split('.').pop() : undefined;

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
          <FileUploadItemPreview>
            {isImageFile(file) ? <FileUploadItemPreviewImage /> : <FileUploadItemPreviewIcon />}
          </FileUploadItemPreview>
          <FileUploadItemName />
          <FileUploadItemMetadata file={file} />
          <FileUploadItemDeleteTrigger />
        </FileUploadItem>
      )}
    </For>
  );
}

function FileUploadClearTrigger(props: ComponentProps<typeof FileUploadPrimitive.ClearTrigger>) {
  return <FileUploadPrimitive.ClearTrigger {...props} data-slot="file-upload-clear-trigger" />;
}

const FileUploadContext = FileUploadPrimitive.Context;
const FileUploadHiddenInput = FileUploadPrimitive.HiddenInput;

export {
  FileUpload,
  FileUploadClearTrigger,
  FileUploadContext,
  FileUploadDropzone,
  FileUploadDropzoneIcon,
  FileUploadHiddenInput,
  FileUploadItem,
  FileUploadItemDeleteTrigger,
  FileUploadItemGroup,
  FileUploadItemMetadata,
  FileUploadItemName,
  FileUploadItems,
  FileUploadItemPreview,
  FileUploadItemPreviewIcon,
  FileUploadItemPreviewImage,
  FileUploadItemSizeText,
  FileUploadLabel,
  FileUploadRootProvider,
  FileUploadTrigger,
  useFileUpload,
  useFileUploadContext,
};

export type {
  FileUploadClearTriggerProps,
  FileUploadContextProps,
  FileUploadDropzoneProps,
  FileUploadFileAcceptDetails,
  FileUploadFileChangeDetails,
  FileUploadFileError,
  FileUploadFileMimeType,
  FileUploadFileRejectDetails,
  FileUploadFileRejection,
  FileUploadFileValidateDetails,
  FileUploadHiddenInputProps,
  FileUploadItemDeleteTriggerProps,
  FileUploadItemGroupProps,
  FileUploadItemNameProps,
  FileUploadItemPreviewImageProps,
  FileUploadItemPreviewProps,
  FileUploadItemProps,
  FileUploadItemSizeTextProps,
  FileUploadLabelProps,
  FileUploadRootProps,
  FileUploadRootProviderProps,
  FileUploadTriggerProps,
  UseFileUploadContext,
  UseFileUploadProps,
  UseFileUploadReturn,
} from '@ark-ui/solid/file-upload';