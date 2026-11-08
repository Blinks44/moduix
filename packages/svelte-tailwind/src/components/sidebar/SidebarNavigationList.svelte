<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarNavigationListProps
    extends HTMLProps<'ul'>, PolymorphicProps<'ul'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SidebarNavigationListProps = $props();
</script>

<Ark
  as="ul"
  {...props}
  bind:ref
  class={cn('flex w-full min-w-0 flex-col gap-1', className)}
  data-scope="sidebar"
  data-part="navigation-list"
  data-slot="sidebar-navigation-list"
/>