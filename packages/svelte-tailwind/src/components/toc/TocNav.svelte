<script lang="ts">
  import { TocNav, type TocNavProps } from '@ark-ui/svelte/toc';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TocNavProps = $props();
</script>

<TocNav
  {...props}
  bind:ref
  class={cn(
    'sticky top-4 max-h-[calc(100dvh-2rem)] self-start overflow-auto rounded-lg border border-border bg-card p-4 text-card-foreground data-[placement=left]:col-start-1 data-[placement=left]:row-start-1 max-md:data-[placement=left]:col-auto max-md:data-[placement=left]:row-auto',
    className,
  )}
  data-slot="toc-nav"
/>