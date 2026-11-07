<script lang="ts">
  import { ListboxContent, type ListboxContentProps } from '@ark-ui/svelte/listbox';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ListboxContentProps = $props();
</script>

<ListboxContent
  {...props}
  bind:ref
  class={cn(
    'flex max-h-56 min-h-0 scroll-py-1 [scrollbar-gutter:stable] flex-col overflow-x-hidden overflow-y-auto rounded-md border border-input bg-background py-1 outline-focus-halo outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out peer-has-[[data-slot=listbox-input]:focus-visible]/listbox-filter:border-x-ring peer-has-[[data-slot=listbox-input]:focus-visible]/listbox-filter:border-b-ring peer-has-[[data-slot=listbox-input]:focus-visible]/listbox-filter:outline-ring/50 peer-data-[slot=listbox-filter]/listbox-filter:-mt-3 peer-data-[slot=listbox-filter]/listbox-filter:rounded-t-none peer-data-[slot=listbox-filter]/listbox-filter:[clip-path:inset(0_calc(var(--moduix-focus-ring-halo-width)*-1)_calc(var(--moduix-focus-ring-halo-width)*-1))] focus-visible:border-ring focus-visible:outline-ring/50 peer-data-[slot=listbox-filter]/listbox-filter:focus-visible:border-t-input data-[layout=grid]:grid data-[layout=grid]:grid-cols-[repeat(var(--column-count),minmax(0,1fr))] data-[layout=grid]:gap-1 data-[layout=grid]:p-2 data-[orientation=horizontal]:not-data-[layout=grid]:max-h-none data-[orientation=horizontal]:not-data-[layout=grid]:flex-row data-[orientation=horizontal]:not-data-[layout=grid]:gap-2 data-[orientation=horizontal]:not-data-[layout=grid]:overflow-x-auto data-[orientation=horizontal]:not-data-[layout=grid]:overflow-y-hidden data-[orientation=horizontal]:not-data-[layout=grid]:px-1',
    className,
  )}
  data-slot="listbox-content"
/>