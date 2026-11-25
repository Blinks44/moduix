<script lang="ts">
  import { clsx } from 'clsx';
  import type { SVGAttributes } from 'svelte/elements';
  import { FileIcon } from '@/lib/moduix/icons/ui';
  import styles from './FileUpload.module.css';

  let { class: className, ...props }: SVGAttributes<SVGSVGElement> = $props();
</script>

<FileIcon
  {...props}
  class={clsx(styles.itemPreviewIcon, className)}
  data-slot="file-upload-item-preview-icon"
/>