<script lang="ts">
  import { TocRoot, type TocRootProps } from '@ark-ui/svelte/toc';
  import { cn } from '@/lib/moduix/cn';
  import { tocRootVariants } from './Toc.variants';

  let {
    activeIds = $bindable(),
    autoScroll = false,
    class: className,
    ref = $bindable(null),
    ...props
  }: TocRootProps = $props();
</script>

<TocRoot
  {...props}
  bind:ref
  bind:activeIds
  class={cn(tocRootVariants(), className)}
  {autoScroll}
  data-slot="toc-root"
/>