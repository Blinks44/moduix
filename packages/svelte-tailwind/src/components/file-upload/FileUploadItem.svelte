<script lang="ts">
  import { FileUploadItem, type FileUploadItemProps } from '@ark-ui/svelte/file-upload';
  import { cn } from '@/lib/moduix/cn';
  const itemClass =
    "group/item grid min-h-control-md shrink-0 grow basis-full grid-cols-[minmax(0,1fr)_auto] content-center items-center gap-x-3 rounded-md border border-border bg-background px-3 py-2 [grid-template-areas:'name_delete'_'meta_delete'] data-[type=rejected]:border-destructive has-[[data-slot=file-upload-item-preview]]:not-has-[[data-slot=file-upload-item-preview-image]]:min-h-control-xl has-[[data-slot=file-upload-item-preview]]:not-has-[[data-slot=file-upload-item-preview-image]]:grid-cols-[auto_minmax(0,1fr)_auto] has-[[data-slot=file-upload-item-preview]]:not-has-[[data-slot=file-upload-item-preview-image]]:[grid-template-areas:'preview_name_delete'_'preview_meta_delete'] has-[[data-slot=file-upload-item-preview-image]]:max-w-40 has-[[data-slot=file-upload-item-preview-image]]:grow-0 has-[[data-slot=file-upload-item-preview-image]]:[grid-template-areas:'preview_preview'_'name_delete'_'meta_delete']";
  const disabledClass =
    'data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

  let { class: className, ref = $bindable(null), ...props }: FileUploadItemProps = $props();
</script>

<FileUploadItem
  {...props}
  bind:ref
  class={cn(itemClass, disabledClass, className)}
  data-slot="file-upload-item"
/>