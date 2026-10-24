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
import { FileIcon, TrashIcon, UploadIcon } from '@/lib/moduix/icons/ui';

const rootClass = 'box-border flex w-full flex-col items-start gap-3 text-foreground';
const disabledClass =
  'data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

const FileUpload = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.Root>,
  ComponentProps<typeof FileUploadPrimitive.Root>
>(function FileUpload({ className, ...props }, ref) {
  return (
    <FileUploadPrimitive.Root
      ref={ref}
      className={cn(rootClass, className)}
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
      className={cn(rootClass, className)}
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
      className={cn('text-sm leading-5 font-medium', disabledClass, className)}
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
        'box-border grid min-h-32 w-full place-items-center gap-3 rounded-md border border-dashed border-border bg-background p-5 text-center text-muted-foreground transition-[border-color,background-color,color] duration-normal ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-dragging:border-primary data-dragging:bg-accent data-dragging:text-foreground data-invalid:border-destructive data-readonly:opacity-disabled [&[role=button]:not([aria-disabled])]:cursor-pointer',
        disabledClass,
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
>(function FileUploadTrigger(props, ref) {
  return <FileUploadPrimitive.Trigger ref={ref} {...props} data-slot="file-upload-trigger" />;
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
        "group/item box-border grid min-h-control-md shrink-0 grow basis-full grid-cols-[minmax(0,1fr)_auto] content-center items-center gap-x-3 rounded-md border border-border bg-background px-3 py-2 [grid-template-areas:'name_delete'_'meta_delete'] has-[[data-slot=file-upload-item-preview-image]]:max-w-40 has-[[data-slot=file-upload-item-preview-image]]:grow-0 has-[[data-slot=file-upload-item-preview-image]]:[grid-template-areas:'preview_preview'_'name_delete'_'meta_delete'] has-[[data-slot=file-upload-item-preview]]:not-has-[[data-slot=file-upload-item-preview-image]]:min-h-control-xl has-[[data-slot=file-upload-item-preview]]:not-has-[[data-slot=file-upload-item-preview-image]]:grid-cols-[auto_minmax(0,1fr)_auto] has-[[data-slot=file-upload-item-preview]]:not-has-[[data-slot=file-upload-item-preview-image]]:[grid-template-areas:'preview_name_delete'_'preview_meta_delete'] data-[type=rejected]:border-destructive",
        disabledClass,
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
        'flex size-10 items-center justify-center overflow-hidden rounded-sm bg-muted text-muted-foreground [grid-area:preview] group-has-[[data-slot=file-upload-item-preview-image]]/item:mb-1 group-has-[[data-slot=file-upload-item-preview-image]]/item:aspect-square group-has-[[data-slot=file-upload-item-preview-image]]/item:h-auto group-has-[[data-slot=file-upload-item-preview-image]]/item:w-full',
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

const FileUploadItemPreviewIcon = forwardRef<SVGSVGElement, ComponentProps<'svg'>>(
  function FileUploadItemPreviewIcon({ className, ...props }, ref) {
    return (
      <FileIcon
        ref={ref}
        className={cn('size-4', className)}
        {...props}
        data-slot="file-upload-item-preview-icon"
      />
    );
  },
);

function getFileTypeLabel(file: File) {
  const extension = file.name.includes('.') ? file.name.split('.').pop() : undefined;

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
      className={cn('truncate text-sm leading-5 font-medium [grid-area:name]', className)}
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
      className={cn(
        'text-xs leading-4 text-muted-foreground [grid-area:meta] [[data-slot=file-upload-item]>&]:mt-1',
        className,
      )}
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
        "mt-1 flex items-center gap-1 text-xs leading-4 text-muted-foreground [grid-area:meta] [&>[data-slot='file-upload-item-size-text']::before]:me-1 [&>[data-slot='file-upload-item-size-text']::before]:content-['·']",
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
        'box-border inline-flex size-control-xs cursor-pointer appearance-none items-center justify-center rounded-sm border-0 bg-transparent p-0 text-muted-foreground transition-[background-color,color] duration-normal ease-in-out [grid-area:delete] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default data-readonly:opacity-disabled [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):hover]:text-foreground',
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
      <FileUploadItemDeleteTrigger />
    </FileUploadItem>
  ));
}

const FileUploadClearTrigger = forwardRef<
  ComponentRef<typeof FileUploadPrimitive.ClearTrigger>,
  ComponentProps<typeof FileUploadPrimitive.ClearTrigger>
>(function FileUploadClearTrigger(props, ref) {
  return (
    <FileUploadPrimitive.ClearTrigger ref={ref} {...props} data-slot="file-upload-clear-trigger" />
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
} from '@ark-ui/react/file-upload';