<script lang="ts">
  import { TocContent, type TocContentProps } from '@ark-ui/svelte/toc';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TocContentProps = $props();
</script>

<TocContent {...props} bind:ref class={cn('min-w-0', className)} data-slot="toc-content" />