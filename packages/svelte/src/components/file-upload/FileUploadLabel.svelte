<script lang="ts">
  import { FileUploadLabel, type FileUploadLabelProps } from '@ark-ui/svelte/file-upload';
  import { clsx } from 'clsx';
  import styles from './FileUpload.module.css';

  let { class: className, ref = $bindable(null), ...props }: FileUploadLabelProps = $props();
</script>

<FileUploadLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="file-upload-label"
/>