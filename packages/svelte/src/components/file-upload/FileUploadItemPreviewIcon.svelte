<script lang="ts">
  import { clsx } from 'clsx';
  import type { SVGAttributes } from 'svelte/elements';
  import { UiIcon } from '@/lib/moduix/icons/ui';
  import styles from './FileUpload.module.css';

  let { class: className, ...props }: SVGAttributes<SVGSVGElement> = $props();
</script>

<UiIcon
  icon="file"
  {...props}
  class={clsx(styles.itemPreviewIcon, className)}
  data-slot="file-upload-item-preview-icon"
/>