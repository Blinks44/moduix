<script lang="ts">
  import {
    FileUploadItemPreview,
    type FileUploadItemPreviewProps,
  } from '@ark-ui/svelte/file-upload';
  import { cn } from '@/lib/moduix/cn';
  const previewClass =
    'flex size-10 items-center justify-center overflow-hidden rounded-sm bg-muted text-muted-foreground [grid-area:preview] group-has-[[data-slot=file-upload-item-preview-image]]/item:mb-1 group-has-[[data-slot=file-upload-item-preview-image]]/item:aspect-square group-has-[[data-slot=file-upload-item-preview-image]]/item:h-auto group-has-[[data-slot=file-upload-item-preview-image]]/item:w-full';

  let { class: className, ref = $bindable(null), ...props }: FileUploadItemPreviewProps = $props();
</script>

<FileUploadItemPreview
  {...props}
  bind:ref
  class={cn(previewClass, className)}
  data-slot="file-upload-item-preview"
/>