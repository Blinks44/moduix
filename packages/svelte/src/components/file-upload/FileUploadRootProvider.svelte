<script lang="ts">
  import {
    FileUploadRootProvider,
    type FileUploadRootProviderProps,
  } from '@ark-ui/svelte/file-upload';
  import { clsx } from 'clsx';
  import styles from './FileUpload.module.css';

  let { class: className, ref = $bindable(null), ...props }: FileUploadRootProviderProps = $props();
</script>

<FileUploadRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="file-upload-root-provider"
/>