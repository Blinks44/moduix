<script lang="ts">
  import { FileUploadRoot, type FileUploadRootProps } from '@ark-ui/svelte/file-upload';
  import { clsx } from 'clsx';
  import styles from './FileUpload.module.css';

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
  class={clsx(styles.root, className)}
  data-slot="file-upload-root"
/>