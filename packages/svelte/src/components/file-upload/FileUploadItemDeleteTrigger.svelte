<script lang="ts">
  import {
    FileUploadItemDeleteTrigger,
    type FileUploadItemDeleteTriggerProps,
  } from '@ark-ui/svelte/file-upload';
  import { clsx } from 'clsx';
  import { TrashIcon } from '@/lib/moduix/icons/ui';
  import styles from './FileUpload.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: FileUploadItemDeleteTriggerProps = $props();
</script>

<FileUploadItemDeleteTrigger
  {...props}
  bind:ref
  class={clsx(styles.itemDeleteTrigger, className)}
  data-slot="file-upload-item-delete-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <TrashIcon />
  {/if}
</FileUploadItemDeleteTrigger>