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
import { CloseIcon, FileIcon, TrashIcon, UploadIcon } from '@/lib/moduix/icons/ui/Icons';
import { CloseButton } from '../close-button';

function FileUploadRoot(props: ComponentProps<typeof FileUploadPrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <FileUploadPrimitive.Root
      asChild={local.asChild}
      data-slot="file-upload-root"
      class={cn(
        'box-border flex w-full max-w-md flex-col items-start gap-3 text-foreground',
        local.class,
      )}
      {...others}
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
      data-slot="file-upload-root-provider"
      class={cn(
        'box-border flex w-full max-w-md flex-col items-start gap-3 text-foreground',
        local.class,
      )}
      {...others}
    >
      {local.children}
    </FileUploadPrimitive.RootProvider>
  );
}

function FileUploadLabel(props: ComponentProps<typeof FileUploadPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.Label
      data-slot="file-upload-label"
      class={cn('text-sm font-medium text-foreground data-disabled:opacity-50', local.class)}
      {...others}
    />
  );
}

function FileUploadDropzone(props: ComponentProps<typeof FileUploadPrimitive.Dropzone>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.Dropzone
      data-slot="file-upload-dropzone"
      class={cn(
        'box-border grid min-h-32 w-full place-items-center gap-3 rounded-md border border-dashed border-border bg-background p-5 text-center text-muted-foreground transition-[border-color,background-color,color,opacity] duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring data-disabled:cursor-default data-disabled:opacity-50 data-dragging:border-primary data-dragging:bg-accent data-dragging:text-foreground data-invalid:border-destructive data-readonly:cursor-default data-readonly:opacity-50 motion-reduce:transition-none [&[role=button]:not([data-disabled],[data-readonly])]:cursor-pointer',
        local.class,
      )}
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
      class={cn(
        'box-border inline-flex size-10 items-center justify-center rounded-full border border-border bg-muted text-foreground [&>svg]:size-4',
        local.class,
      )}
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
      class={cn(
        'box-border inline-flex min-h-control-md cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-primary bg-primary px-4 text-sm leading-5 font-medium whitespace-nowrap text-primary-foreground transition-[border-color,background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default data-disabled:pointer-events-none data-disabled:cursor-default data-invalid:border-destructive data-readonly:pointer-events-none data-readonly:cursor-default motion-reduce:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-readonly]):hover]:bg-foreground',
        local.class,
      )}
      {...others}
    />
  );
}

function FileUploadItemGroup(props: ComponentProps<typeof FileUploadPrimitive.ItemGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.ItemGroup
      data-slot="file-upload-item-group"
      class={cn('flex w-full flex-wrap items-start gap-2 empty:hidden', local.class)}
      {...others}
    />
  );
}

function FileUploadItem(props: ComponentProps<typeof FileUploadPrimitive.Item>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.Item
      data-slot="file-upload-item"
      class={cn(
        'group/item box-border grid min-h-control-md shrink-0 grow basis-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 rounded-md border border-border bg-background px-3 py-2 text-foreground has-[[data-slot=file-upload-item-preview-image]]:min-h-0 has-[[data-slot=file-upload-item-preview-image]]:max-w-40 has-[[data-slot=file-upload-item-preview-image]]:grow-0 has-[[data-slot=file-upload-item-preview-image]]:grid-cols-[minmax(0,1fr)_auto] has-[[data-slot=file-upload-item-preview-image]]:grid-rows-[auto_auto_auto] has-[[data-slot=file-upload-item-preview-image]]:items-start has-[[data-slot=file-upload-item-preview]]:min-h-control-xl has-[[data-slot=file-upload-item-preview]]:grid-cols-[auto_minmax(0,1fr)_auto] has-[[data-slot=file-upload-item-preview]]:py-2 data-disabled:opacity-50 data-[type=rejected]:border-destructive',
        local.class,
      )}
      {...others}
    />
  );
}

function FileUploadItemPreview(props: ComponentProps<typeof FileUploadPrimitive.ItemPreview>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.ItemPreview
      data-slot="file-upload-item-preview"
      class={cn(
        'col-start-1 row-span-2 row-start-1 inline-flex size-10 items-center justify-center overflow-hidden rounded-sm bg-muted text-muted-foreground group-has-[[data-slot=file-upload-item-preview-image]]/item:col-span-2 group-has-[[data-slot=file-upload-item-preview-image]]/item:aspect-square group-has-[[data-slot=file-upload-item-preview-image]]/item:h-auto group-has-[[data-slot=file-upload-item-preview-image]]/item:w-full',
        local.class,
      )}
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
      class={cn('size-full object-cover', local.class)}
      {...others}
    />
  );
}

function FileUploadItemPreviewIcon(props: ComponentProps<'svg'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileIcon
      data-slot="file-upload-item-preview-icon"
      class={cn('size-4', local.class)}
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
      class={cn(
        'col-start-1 line-clamp-1 min-w-0 text-sm leading-5 font-medium group-has-[[data-slot=file-upload-item-preview-image]]/item:col-start-1 group-has-[[data-slot=file-upload-item-preview-image]]/item:row-start-2 group-has-[[data-slot=file-upload-item-preview-image]]/item:self-end group-has-[[data-slot=file-upload-item-preview]]/item:col-start-2',
        local.class,
      )}
      {...others}
    />
  );
}

function FileUploadItemSizeText(props: ComponentProps<typeof FileUploadPrimitive.ItemSizeText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FileUploadPrimitive.ItemSizeText
      data-slot="file-upload-item-size-text"
      class={cn('text-xs leading-4 text-muted-foreground', local.class)}
      {...others}
    />
  );
}

function FileUploadItemMetadata(props: HTMLArkProps<'div'> & { file: File }) {
  const [local, others] = splitProps(props, ['class', 'file']);

  return (
    <ark.div
      data-slot="file-upload-item-metadata"
      class={cn(
        "col-start-1 flex items-center gap-1 text-xs leading-4 text-muted-foreground group-has-[[data-slot=file-upload-item-preview-image]]/item:col-start-1 group-has-[[data-slot=file-upload-item-preview-image]]/item:row-start-3 group-has-[[data-slot=file-upload-item-preview]]/item:col-start-2 [&>[data-slot='file-upload-item-size-text']::before]:me-1 [&>[data-slot='file-upload-item-size-text']::before]:content-['·']",
        local.class,
      )}
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
      class={cn(
        'col-start-2 row-start-1 box-border inline-flex size-control-sm shrink-0 cursor-pointer appearance-none items-center justify-center justify-self-end rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out group-has-[[data-slot=file-upload-item-preview-image]]/item:col-start-2 group-has-[[data-slot=file-upload-item-preview-image]]/item:row-start-2 group-has-[[data-slot=file-upload-item-preview-image]]/item:self-center group-has-[[data-slot=file-upload-item-preview]]/item:col-start-3 group-has-[[data-slot=file-upload-item-preview]]/item:row-span-2 group-has-[[data-slot=file-upload-item-preview]]/item:row-start-1 group-has-[[data-slot=file-upload-item-size-text]]/item:row-span-2 group-has-[[data-slot=file-upload-item-size-text]]/item:row-start-1 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 data-readonly:pointer-events-none data-readonly:cursor-default data-readonly:opacity-50 motion-reduce:transition-none [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-readonly]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-readonly]):hover]:text-foreground',
        local.class,
      )}
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
    cn(
      'size-control-sm self-start rounded-sm bg-transparent text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring data-readonly:pointer-events-none data-readonly:opacity-50 [&>svg]:size-4',
      local.children != null && 'w-auto gap-2 px-2 text-sm leading-5',
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