<script lang="ts">
  import { ListboxInput, type ListboxInputProps } from '@ark-ui/svelte/listbox';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ListboxInputProps = $props();

  const inputClass =
    'm-0 min-h-control-md w-full rounded-md border border-input bg-background px-3 py-1 text-md leading-6 text-foreground outline-focus-halo outline-transparent transition-[border-color,outline-color,opacity] duration-normal ease-in-out group-has-[[data-slot=listbox-filter-icon]]/listbox-filter:ps-9 group-has-[[data-slot=listbox-filter-icon]]/listbox-filter:pe-11 group-has-[+_[data-slot=listbox-content]]/listbox-filter:rounded-b-none group-has-[+_[data-slot=listbox-content]]/listbox-filter:border-b-0 group-has-[+_[data-slot=listbox-content]:focus-visible]/listbox-filter:border-ring group-has-[+_[data-slot=listbox-content]:focus-visible]/listbox-filter:outline-ring/50 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-ring/50 disabled:cursor-default disabled:opacity-disabled [:is([data-slot=listbox-root],[data-slot=listbox-root-provider])[data-disabled]_&]:opacity-100 group-has-[+_[data-slot=listbox-content]]/listbox-filter:[clip-path:inset(calc(var(--moduix-focus-ring-halo-width)*-1)_calc(var(--moduix-focus-ring-halo-width)*-1)_0)]';
</script>

<ListboxInput {...props} bind:ref class={cn(inputClass, className)} data-slot="listbox-input" />