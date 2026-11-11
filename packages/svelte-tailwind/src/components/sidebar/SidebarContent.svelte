<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarContentProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SidebarContentProps = $props();

  const contentClass =
    'flex min-h-0 flex-auto [scrollbar-gutter:stable] flex-col overflow-auto overscroll-contain group-data-[state=collapsed]/sidebar-panel:[scrollbar-width:none] group-data-[state=collapsed]/sidebar-panel:[scrollbar-gutter:auto] group-data-[state=collapsed]/sidebar-panel:overflow-x-hidden';
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={cn(contentClass, className)}
  data-scope="sidebar"
  data-part="content"
  data-slot="sidebar-content"
/>