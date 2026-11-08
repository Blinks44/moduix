<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarHeaderProps
    extends HTMLProps<'header'>, PolymorphicProps<'header'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SidebarHeaderProps = $props();

  const headerClass =
    'flex flex-none items-center gap-2 p-3 group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:px-1 [&>*:only-child]:w-full group-data-[state=collapsed]/sidebar-panel:[&>*:only-child]:w-auto';
</script>

<Ark
  as="header"
  {...props}
  bind:ref
  class={cn(headerClass, className)}
  data-scope="sidebar"
  data-part="header"
  data-slot="sidebar-header"
/>