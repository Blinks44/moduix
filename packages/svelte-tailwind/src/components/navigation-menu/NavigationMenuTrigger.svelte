<script lang="ts">
  import {
    NavigationMenuTrigger,
    type NavigationMenuTriggerProps,
  } from '@ark-ui/svelte/navigation-menu';
  import { cn } from '@/lib/moduix/cn';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: NavigationMenuTriggerProps = $props();

  const triggerClass =
    'inline-flex min-h-control-md items-center justify-center gap-2 rounded-md bg-transparent px-3 py-1 text-sm leading-5 font-medium whitespace-nowrap text-inherit no-underline outline-0 transition-[background-color,color] duration-normal ease-in-out select-none focus-visible:outline-focus-inset focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-disabled data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-disabled data-[state=open]:bg-muted [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:transition-[rotate] [&>svg]:duration-normal [&>svg]:ease-in-out data-[state=open]:[&>svg]:rotate-180 motion-reduce:[&>svg]:transition-none [@media(hover:hover)]:[&:not(:disabled):not([data-disabled])]:hover:bg-muted';
</script>

<NavigationMenuTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(!asChild && triggerClass, className)}
  data-slot="navigation-menu-trigger"
/>