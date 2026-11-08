<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarNavigationSubButtonProps
    extends HTMLProps<'a'>, PolymorphicProps<'a'>, RefAttribute {
    active?: boolean;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let {
    active = false,
    class: className,
    ref = $bindable(null),
    'aria-current': ariaCurrent,
    ...props
  }: SidebarNavigationSubButtonProps = $props();

  const menuSubButtonClass = [
    'flex min-h-control-sm w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 text-start text-sm leading-5 whitespace-nowrap text-sidebar-foreground outline-0 transition-colors duration-normal ease-in-out has-[+_[data-slot=sidebar-navigation-badge]]:pe-10 @max-[7rem]:has-[+_[data-slot=sidebar-navigation-badge]]:pe-2',
    'focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-sidebar-ring disabled:pointer-events-none disabled:opacity-disabled aria-disabled:pointer-events-none aria-disabled:opacity-disabled data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&:not(:disabled):not([aria-disabled=true])]:hover:bg-sidebar-accent [&:not(:disabled):not([aria-disabled=true])]:hover:text-sidebar-accent-foreground',
    "[&>[data-sidebar-icon]]:shrink-0 [&>span:last-child]:min-w-0 [&>span:last-child]:truncate [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0",
  ];
</script>

<Ark
  as="a"
  {...props}
  bind:ref
  aria-current={ariaCurrent ?? (active ? 'page' : undefined)}
  class={cn(menuSubButtonClass, className)}
  data-active={active ? '' : undefined}
  data-scope="sidebar"
  data-part="navigation-sub-button"
  data-slot="sidebar-navigation-sub-button"
/>