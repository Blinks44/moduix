<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface FileUploadItemMetadataProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {
    file: File;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './FileUpload.module.css';
  import FileUploadItemSizeText from './FileUploadItemSizeText.svelte';

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
  class={clsx(styles.itemMetadata, className)}
  data-slot="file-upload-item-metadata"
>
  <Ark as="span">{getFileTypeLabel(file)}</Ark>
  <FileUploadItemSizeText />
</Ark>