<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';
  import { cn } from '@/lib/moduix/cn';
  import { FileIcon } from '@/lib/moduix/icons/ui';

  let { class: className, ...props }: SVGAttributes<SVGSVGElement> = $props();
</script>

<FileIcon {...props} class={cn('size-4', className)} data-slot="file-upload-item-preview-icon" />