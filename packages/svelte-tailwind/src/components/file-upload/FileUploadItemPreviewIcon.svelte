<script lang="ts">
  import type { LucideProps } from '@lucide/svelte';
  import { cn } from '@/lib/moduix/cn';
  import { FileIcon } from '@/lib/moduix/icons/ui';

  let { class: className, ...props }: LucideProps = $props();
</script>

<FileIcon {...props} class={cn('size-4', className)} data-slot="file-upload-item-preview-icon" />