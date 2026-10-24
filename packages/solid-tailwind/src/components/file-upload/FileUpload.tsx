import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import {
  FileUpload as FileUploadPrimitive,
  useFileUpload,
  useFileUploadContext,
} from '@ark-ui/solid/file-upload';
import { For, children as resolveChildren, splitProps } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { FileIcon, TrashIcon, UploadIcon } from '@/lib/moduix/icons/ui';

const rootClass = 'box-border flex w-full flex-col items-start gap-3 text-foreground';
const disabledClass =
  'data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

function FileUpload(props: ComponentProps<typeof FileUploadPrimitive.Root>) {
  const [local, others] = splitProps(props, ['children', 'class']);

  return (
    <FileUploadPrimitive.Root
      class={cn(rootClass, local.class)}
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
      class={cn(rootClass, local.class)}
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
      class={cn('text-sm leading-5 font-medium', disabledClass, local.class)}
      {...others}
      data-slot="file-upload-label"
    />
  );
}

function FileUploadDropzone(props: ComponentProps<typeof FileUploadPrimitive.Dropzone>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.Dropzone
      class={cn(
        'box-border grid min-h-32 w-full place-items-center gap-3 rounded-md border border-dashed border-border bg-background p-5 text-center text-muted-foreground transition-[border-color,background-color,color] duration-normal ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-dragging:border-primary data-dragging:bg-accent data-dragging:text-foreground data-invalid:border-destructive data-readonly:opacity-disabled [&[role=button]:not([aria-disabled])]:cursor-pointer',
        disabledClass,
        local.class,
      )}
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
      class={cn(
        'box-border inline-flex size-10 items-center justify-center rounded-full border border-border bg-muted text-foreground [&>svg]:size-4',
        local.class,
      )}
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
      class={cn('flex w-full flex-wrap items-start gap-2 empty:hidden', local.class)}
      {...others}
      data-slot="file-upload-item-group"
    />
  );
}

function FileUploadItem(props: ComponentProps<typeof FileUploadPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.Item
      class={cn(
        "group/item box-border grid min-h-control-md shrink-0 grow basis-full grid-cols-[minmax(0,1fr)_auto] content-center items-center gap-x-3 rounded-md border border-border bg-background px-3 py-2 [grid-template-areas:'name_delete'_'meta_delete'] has-[[data-slot=file-upload-item-preview-image]]:max-w-40 has-[[data-slot=file-upload-item-preview-image]]:grow-0 has-[[data-slot=file-upload-item-preview-image]]:[grid-template-areas:'preview_preview'_'name_delete'_'meta_delete'] has-[[data-slot=file-upload-item-preview]]:not-has-[[data-slot=file-upload-item-preview-image]]:min-h-control-xl has-[[data-slot=file-upload-item-preview]]:not-has-[[data-slot=file-upload-item-preview-image]]:grid-cols-[auto_minmax(0,1fr)_auto] has-[[data-slot=file-upload-item-preview]]:not-has-[[data-slot=file-upload-item-preview-image]]:[grid-template-areas:'preview_name_delete'_'preview_meta_delete'] data-[type=rejected]:border-destructive",
        disabledClass,
        local.class,
      )}
      {...others}
      data-slot="file-upload-item"
    />
  );
}

function FileUploadItemPreview(props: ComponentProps<typeof FileUploadPrimitive.ItemPreview>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.ItemPreview
      class={cn(
        'flex size-10 items-center justify-center overflow-hidden rounded-sm bg-muted text-muted-foreground [grid-area:preview] group-has-[[data-slot=file-upload-item-preview-image]]/item:mb-1 group-has-[[data-slot=file-upload-item-preview-image]]/item:aspect-square group-has-[[data-slot=file-upload-item-preview-image]]/item:h-auto group-has-[[data-slot=file-upload-item-preview-image]]/item:w-full',
        local.class,
      )}
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
      class={cn('size-full object-cover', local.class)}
      {...others}
      data-slot="file-upload-item-preview-image"
    />
  );
}

function FileUploadItemPreviewIcon(props: ComponentProps<'svg'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileIcon
      class={cn('size-4', local.class)}
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
      class={cn('truncate text-sm leading-5 font-medium [grid-area:name]', local.class)}
      {...others}
      data-slot="file-upload-item-name"
    />
  );
}

function FileUploadItemSizeText(props: ComponentProps<typeof FileUploadPrimitive.ItemSizeText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.ItemSizeText
      class={cn(
        'text-xs leading-4 text-muted-foreground [grid-area:meta] [[data-slot=file-upload-item]>&]:mt-1',
        local.class,
      )}
      {...others}
      data-slot="file-upload-item-size-text"
    />
  );
}

function FileUploadItemMetadata(props: HTMLArkProps<'div'> & { file: File }) {
  const [local, others] = splitProps(props, ['class', 'file']);

  return (
    <ark.div
      class={cn(
        "mt-1 flex items-center gap-1 text-xs leading-4 text-muted-foreground [grid-area:meta] [&>[data-slot='file-upload-item-size-text']::before]:me-1 [&>[data-slot='file-upload-item-size-text']::before]:content-['·']",
        local.class,
      )}
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
      class={cn(
        'box-border inline-flex size-control-xs cursor-pointer appearance-none items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color] duration-normal ease-in-out [grid-area:delete] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default data-readonly:opacity-disabled [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):hover]:text-foreground',
        local.class,
      )}
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