<script lang="ts">
  import { FileUploadItemName, type FileUploadItemNameProps } from '@ark-ui/svelte/file-upload';
  import { cn } from '@/lib/moduix/cn';
  const nameClass = 'truncate text-sm leading-5 font-medium [grid-area:name]';

  let { class: className, ref = $bindable(null), ...props }: FileUploadItemNameProps = $props();
</script>

<FileUploadItemName
  {...props}
  bind:ref
  class={cn(nameClass, className)}
  data-slot="file-upload-item-name"
/>