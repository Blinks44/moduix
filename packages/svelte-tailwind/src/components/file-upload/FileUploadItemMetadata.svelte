<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface FileUploadItemMetadataProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {
    file: File;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
  import FileUploadItemSizeText from './FileUploadItemSizeText.svelte';
  const metadataClass =
    "mt-1 flex items-center gap-1 text-xs leading-4 text-muted-foreground [grid-area:meta] [&>[data-slot='file-upload-item-size-text']::before]:me-1 [&>[data-slot='file-upload-item-size-text']::before]:content-['·']";

  let {
    class: className,
    file,
    ref = $bindable(null),
    ...props
  }: FileUploadItemMetadataProps = $props();

  const getFileTypeLabel = (file: File) => {
    const extension = file.name.includes('.') ? file.name.split('.').pop() : undefined;
    return extension ? extension.toUpperCase() : file.type || 'FILE';
  };
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={cn(metadataClass, className)}
  data-slot="file-upload-item-metadata"
>
  <Ark as="span">{getFileTypeLabel(file)}</Ark>
  <FileUploadItemSizeText />
</Ark>