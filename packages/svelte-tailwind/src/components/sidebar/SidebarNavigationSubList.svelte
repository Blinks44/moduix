<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarNavigationSubListProps
    extends HTMLProps<'ul'>, PolymorphicProps<'ul'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: SidebarNavigationSubListProps = $props();
</script>

<Ark
  as="ul"
  {...props}
  bind:ref
  class={cn(
    'ms-4 mt-1 flex w-auto min-w-0 flex-col gap-1 border-s border-sidebar-border ps-2 group-data-[state=collapsed]/sidebar-panel:hidden',
    className,
  )}
  data-scope="sidebar"
  data-part="navigation-sub-list"
  data-slot="sidebar-navigation-sub-list"
/>