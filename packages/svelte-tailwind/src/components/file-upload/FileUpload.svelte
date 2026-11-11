<script lang="ts">
  import { FileUploadRoot, type FileUploadRootProps } from '@ark-ui/svelte/file-upload';
  import { cn } from '@/lib/moduix/cn';
  const rootClass = 'flex w-full flex-col items-start gap-3 text-foreground';

  let {
    acceptedFiles = $bindable(),
    class: className,
    ref = $bindable(null),
    ...props
  }: FileUploadRootProps = $props();
</script>

<FileUploadRoot
  {...props}
  bind:ref
  bind:acceptedFiles
  class={cn(rootClass, className)}
  data-slot="file-upload-root"
/>