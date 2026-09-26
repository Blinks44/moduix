'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import {
  FileUpload as FileUploadPrimitive,
  useFileUpload,
  useFileUploadContext,
} from '@ark-ui/react/file-upload';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { CloseIcon, FileIcon, TrashIcon, UploadIcon } from '@/lib/moduix/icons/ui';
import { CloseButton } from '../close-button';

const FileUpload = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.Root>,
  ComponentProps<typeof FileUploadPrimitive.Root>
>(function FileUpload({ className, ...props }, ref) {
  return (
    <FileUploadPrimitive.Root
      ref={ref}
      className={cn(
        'box-border flex w-full max-w-md flex-col items-start gap-3 text-foreground',
        className,
      )}
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
      className={cn(
        'box-border flex w-full max-w-md flex-col items-start gap-3 text-foreground',
        className,
      )}
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
      className={cn('text-sm font-medium text-foreground data-disabled:opacity-50', className)}
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
      className={cn(
        'box-border grid min-h-32 w-full place-items-center gap-3 rounded-md border border-dashed border-border bg-background p-5 text-center text-muted-foreground transition-[border-color,background-color,color,opacity] duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring data-disabled:cursor-default data-disabled:opacity-50 data-dragging:border-primary data-dragging:bg-accent data-dragging:text-foreground data-invalid:border-destructive data-readonly:cursor-default data-readonly:opacity-50 motion-reduce:transition-none [&[role=button]:not([data-disabled],[data-readonly])]:cursor-pointer',
        className,
      )}
      {...props}
      data-slot="file-upload-dropzone"
    />
  );
});

function FileUploadDropzoneIcon({ className, children, ...props }: HTMLArkProps<'span'>) {
  return (
    <ark.span
      aria-hidden="true"
      className={cn(
        'box-border inline-flex size-10 items-center justify-center rounded-full border border-border bg-muted text-foreground [&>svg]:size-4',
        className,
      )}
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
      className={cn(
        'box-border inline-flex min-h-control-md cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-primary bg-primary px-4 text-sm leading-5 font-medium whitespace-nowrap text-primary-foreground transition-[border-color,background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default data-disabled:pointer-events-none data-disabled:cursor-default data-invalid:border-destructive data-readonly:pointer-events-none data-readonly:cursor-default motion-reduce:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-readonly]):hover]:bg-foreground',
        className,
      )}
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
      className={cn('flex w-full flex-wrap items-start gap-2 empty:hidden', className)}
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
      className={cn(
        'group/item box-border grid min-h-control-md shrink-0 grow basis-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 rounded-md border border-border bg-background px-3 py-2 text-foreground has-[[data-slot=file-upload-item-preview-image]]:min-h-0 has-[[data-slot=file-upload-item-preview-image]]:max-w-40 has-[[data-slot=file-upload-item-preview-image]]:grow-0 has-[[data-slot=file-upload-item-preview-image]]:grid-cols-[minmax(0,1fr)_auto] has-[[data-slot=file-upload-item-preview-image]]:grid-rows-[auto_auto_auto] has-[[data-slot=file-upload-item-preview-image]]:items-start has-[[data-slot=file-upload-item-preview]]:min-h-control-xl has-[[data-slot=file-upload-item-preview]]:grid-cols-[auto_minmax(0,1fr)_auto] has-[[data-slot=file-upload-item-preview]]:py-2 data-disabled:opacity-50 data-[type=rejected]:border-destructive',
        className,
      )}
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
      className={cn(
        'col-start-1 row-span-2 row-start-1 inline-flex size-10 items-center justify-center overflow-hidden rounded-sm bg-muted text-muted-foreground group-has-[[data-slot=file-upload-item-preview-image]]/item:col-span-2 group-has-[[data-slot=file-upload-item-preview-image]]/item:aspect-square group-has-[[data-slot=file-upload-item-preview-image]]/item:h-auto group-has-[[data-slot=file-upload-item-preview-image]]/item:w-full',
        className,
      )}
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
      className={cn('size-full object-cover', className)}
      {...props}
      data-slot="file-upload-item-preview-image"
    />
  );
});

function FileUploadItemPreviewIcon({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <FileIcon
      className={cn('size-4', className)}
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
      className={cn(
        'col-start-1 line-clamp-1 min-w-0 text-sm leading-5 font-medium group-has-[[data-slot=file-upload-item-preview-image]]/item:col-start-1 group-has-[[data-slot=file-upload-item-preview-image]]/item:row-start-2 group-has-[[data-slot=file-upload-item-preview-image]]/item:self-end group-has-[[data-slot=file-upload-item-preview]]/item:col-start-2',
        className,
      )}
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
      className={cn('text-xs leading-4 text-muted-foreground', className)}
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
      className={cn(
        "col-start-1 flex items-center gap-1 text-xs leading-4 text-muted-foreground group-has-[[data-slot=file-upload-item-preview-image]]/item:col-start-1 group-has-[[data-slot=file-upload-item-preview-image]]/item:row-start-3 group-has-[[data-slot=file-upload-item-preview]]/item:col-start-2 [&>[data-slot='file-upload-item-size-text']::before]:me-1 [&>[data-slot='file-upload-item-size-text']::before]:content-['·']",
        className,
      )}
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
      className={cn(
        'col-start-2 row-start-1 box-border inline-flex size-control-sm shrink-0 cursor-pointer appearance-none items-center justify-center justify-self-end rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out group-has-[[data-slot=file-upload-item-preview-image]]/item:col-start-2 group-has-[[data-slot=file-upload-item-preview-image]]/item:row-start-2 group-has-[[data-slot=file-upload-item-preview-image]]/item:self-center group-has-[[data-slot=file-upload-item-preview]]/item:col-start-3 group-has-[[data-slot=file-upload-item-preview]]/item:row-span-2 group-has-[[data-slot=file-upload-item-preview]]/item:row-start-1 group-has-[[data-slot=file-upload-item-size-text]]/item:row-span-2 group-has-[[data-slot=file-upload-item-size-text]]/item:row-start-1 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 data-readonly:pointer-events-none data-readonly:cursor-default data-readonly:opacity-50 motion-reduce:transition-none [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-readonly]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-readonly]):hover]:text-foreground',
        className,
      )}
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
  const triggerClassName = cn(
    'size-control-sm self-start rounded-sm bg-transparent text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring data-readonly:pointer-events-none data-readonly:opacity-50 [&>svg]:size-4',
    children != null && 'w-auto gap-2 px-2 text-sm leading-5',
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