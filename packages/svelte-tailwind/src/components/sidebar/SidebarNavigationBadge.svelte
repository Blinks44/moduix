<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarNavigationBadgeProps
    extends HTMLProps<'span'>, PolymorphicProps<'span'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SidebarNavigationBadgeProps = $props();

  const menuBadgeClass =
    'pointer-events-none absolute end-2.5 top-1/2 z-1 inline-grid size-5 -translate-y-1/2 place-items-center rounded-full bg-primary text-[0.5625rem] leading-none font-medium text-primary-foreground tabular-nums @max-[7rem]:hidden';
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  class={cn(menuBadgeClass, className)}
  data-scope="sidebar"
  data-part="navigation-badge"
  data-slot="sidebar-navigation-badge"
/>