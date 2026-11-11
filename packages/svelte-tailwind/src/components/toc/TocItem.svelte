<script lang="ts">
  import { TocItem, type TocItemProps } from '@ark-ui/svelte/toc';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TocItemProps = $props();
</script>

<TocItem {...props} bind:ref class={cn('min-w-0', className)} data-slot="toc-item" />