<script lang="ts">
  import {
    FileUploadItemPreviewImage,
    type FileUploadItemPreviewImageProps,
  } from '@ark-ui/svelte/file-upload';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: FileUploadItemPreviewImageProps = $props();
</script>

<FileUploadItemPreviewImage
  {...props}
  bind:ref
  class={cn('size-full object-cover', className)}
  data-slot="file-upload-item-preview-image"
/>