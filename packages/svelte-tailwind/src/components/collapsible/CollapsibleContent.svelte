<script lang="ts">
  import { CollapsibleContent, type CollapsibleContentProps } from '@ark-ui/svelte/collapsible';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: CollapsibleContentProps = $props();
</script>

<CollapsibleContent
  {...props}
  bind:ref
  class={cn(
    'overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-moduix-collapsible-closed data-[has-collapsed-size]:data-[state=closed]:animate-moduix-collapsible-closed-partial data-[state=open]:animate-moduix-collapsible-open data-[has-collapsed-size]:data-[state=open]:animate-moduix-collapsible-open-partial motion-reduce:data-[state]:animate-none motion-reduce:data-[has-collapsed-size]:data-[state]:animate-none',
    className,
  )}
  data-slot="collapsible-content"
/>