<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarFooterProps
    extends HTMLProps<'footer'>, PolymorphicProps<'footer'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SidebarFooterProps = $props();
</script>

<Ark
  as="footer"
  {...props}
  bind:ref
  class={cn(
    'flex flex-none items-center gap-2 p-3 group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:px-1',
    className,
  )}
  data-scope="sidebar"
  data-part="footer"
  data-slot="sidebar-footer"
/>