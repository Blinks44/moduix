<script lang="ts">
  import {
    FileUploadRootProvider,
    type FileUploadRootProviderProps,
  } from '@ark-ui/svelte/file-upload';
  import { cn } from '@/lib/moduix/cn';
  const rootClass = 'flex w-full flex-col items-start gap-3 text-foreground';

  let { class: className, ref = $bindable(null), ...props }: FileUploadRootProviderProps = $props();
</script>

<FileUploadRootProvider
  {...props}
  bind:ref
  class={cn(rootClass, className)}
  data-slot="file-upload-root-provider"
/>