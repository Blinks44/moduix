<script lang="ts">
  import { FileUploadItemGroup, type FileUploadItemGroupProps } from '@ark-ui/svelte/file-upload';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: FileUploadItemGroupProps = $props();
</script>

<FileUploadItemGroup
  {...props}
  bind:ref
  class={cn('flex w-full flex-wrap items-start gap-2 empty:hidden', className)}
  data-slot="file-upload-item-group"
/>