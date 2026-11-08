<script lang="ts">
  import { TabTrigger, type TabTriggerProps } from '@ark-ui/svelte/tabs';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TabTriggerProps = $props();

  const triggerClass =
    "inline-flex h-[calc(var(--_tabs-size)-2*var(--moduix-spacing-1)-2*var(--moduix-border-width-sm))] cursor-pointer items-center justify-center gap-2 rounded-md border-0 bg-transparent px-2.5 text-sm font-medium whitespace-nowrap text-muted-foreground no-underline outline-0 transition-[color] duration-normal ease-in-out select-none group-data-[size=lg]/tabs:px-3 group-data-[size=lg]/tabs:text-md group-data-[size=sm]/tabs:px-2 focus-visible:outline-focus-inset focus-visible:outline-offset-focus-inset focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-disabled data-selected:text-foreground group-data-fitted/tabs:data-[orientation=horizontal]:flex-1 [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:hover:text-foreground";
</script>

<TabTrigger {...props} bind:ref class={cn(triggerClass, className)} data-slot="tabs-trigger" />