<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarGroupLabelProps
    extends HTMLProps<'h3'>, PolymorphicProps<'h3'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SidebarGroupLabelProps = $props();
</script>

<Ark
  as="h3"
  {...props}
  bind:ref
  class={cn(
    'min-w-0 flex-1 truncate px-2 text-xs leading-4 font-medium text-muted-foreground group-data-[state=collapsed]/sidebar-panel:sr-only',
    className,
  )}
  data-scope="sidebar"
  data-part="group-label"
  data-slot="sidebar-group-label"
/>