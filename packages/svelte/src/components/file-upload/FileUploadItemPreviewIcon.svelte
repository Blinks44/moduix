<script lang="ts">
  import type { LucideProps } from '@lucide/svelte';
  import { clsx } from 'clsx';
  import { FileIcon } from '@/lib/moduix/icons/ui';
  import styles from './FileUpload.module.css';

  let { class: className, ...props }: LucideProps = $props();
</script>

<FileIcon
  {...props}
  class={clsx(styles.itemPreviewIcon, className)}
  data-slot="file-upload-item-preview-icon"
/>