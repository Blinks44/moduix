<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarGroupActionProps
    extends HTMLProps<'button'>, PolymorphicProps<'button'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    type = 'button',
    ...props
  }: SidebarGroupActionProps = $props();

  const groupActionClass =
    "me-2 inline-flex size-control-xs flex-none cursor-pointer items-center justify-center rounded-md p-0 text-muted-foreground outline-0 transition-colors duration-normal ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-sidebar-ring @max-[7rem]:hidden [&>svg:not([class*='size-'])]:size-4";
</script>

<Ark
  as="button"
  {...props}
  bind:ref
  {type}
  class={cn(groupActionClass, className)}
  data-scope="sidebar"
  data-part="group-action"
  data-slot="sidebar-group-action"
/>