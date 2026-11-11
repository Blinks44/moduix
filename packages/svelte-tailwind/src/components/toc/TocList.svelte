<script lang="ts">
  import { TocList, type TocListProps } from '@ark-ui/svelte/toc';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TocListProps = $props();

  const listClass =
    "relative m-0 grid list-none gap-0.5 ps-1 has-[[data-slot=toc-indicator]]:before:pointer-events-none has-[[data-slot=toc-indicator]]:before:absolute has-[[data-slot=toc-indicator]]:before:inset-y-0.5 has-[[data-slot=toc-indicator]]:before:start-0 has-[[data-slot=toc-indicator]]:before:w-0.5 has-[[data-slot=toc-indicator]]:before:rounded-full has-[[data-slot=toc-indicator]]:before:bg-border has-[[data-slot=toc-indicator]]:before:content-['']";
</script>

<TocList {...props} bind:ref class={cn(listClass, className)} data-slot="toc-list" />