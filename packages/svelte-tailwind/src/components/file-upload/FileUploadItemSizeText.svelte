<script lang="ts">
  import {
    FileUploadItemSizeText,
    type FileUploadItemSizeTextProps,
  } from '@ark-ui/svelte/file-upload';
  import { cn } from '@/lib/moduix/cn';
  const sizeTextClass =
    'text-xs leading-4 text-muted-foreground [grid-area:meta] [[data-slot=file-upload-item]>&]:mt-1';

  let { class: className, ref = $bindable(null), ...props }: FileUploadItemSizeTextProps = $props();
</script>

<FileUploadItemSizeText
  {...props}
  bind:ref
  class={cn(sizeTextClass, className)}
  data-slot="file-upload-item-size-text"
/>