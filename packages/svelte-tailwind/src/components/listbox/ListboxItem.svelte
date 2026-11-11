<script lang="ts">
  import { ListboxItem, type ListboxItemProps } from '@ark-ui/svelte/listbox';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ListboxItemProps = $props();
</script>

<ListboxItem
  {...props}
  bind:ref
  class={cn(
    'mx-1 grid min-h-control-sm cursor-pointer grid-cols-[minmax(0,1fr)_1rem] items-center gap-2 rounded-sm px-3 py-1 text-sm leading-5 outline-0 transition-[background-color,color] duration-normal ease-in-out select-none data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-disabled data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[layout=grid]:mx-0 data-[layout=grid]:min-w-0 data-[layout=grid]:grid-cols-1 data-[layout=grid]:justify-items-center data-[layout=grid]:text-center data-[layout=grid]:data-selected:bg-muted data-[layout=grid]:data-selected:text-foreground data-[orientation=horizontal]:not-data-[layout=grid]:w-44 data-[orientation=horizontal]:not-data-[layout=grid]:min-w-44 data-[orientation=horizontal]:not-data-[layout=grid]:items-start [:is([data-slot=listbox-root],[data-slot=listbox-root-provider])[data-disabled]_&]:opacity-100 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-accent-foreground',
    className,
  )}
  data-slot="listbox-item"
/>