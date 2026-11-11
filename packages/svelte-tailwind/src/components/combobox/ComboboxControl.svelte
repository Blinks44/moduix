<script lang="ts">
  import { ComboboxControl, type ComboboxControlProps } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ComboboxControlProps = $props();
</script>

<ComboboxControl
  {...props}
  bind:ref
  class={cn(
    'group/combobox-control relative flex w-full min-w-0 items-center rounded-md border border-input bg-background text-foreground outline-focus-halo outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out data-disabled:opacity-disabled data-focus:border-ring data-focus:outline-ring/50 data-invalid:border-destructive data-invalid:data-focus:outline-destructive/20 data-[state=open]:border-ring data-[state=open]:outline-ring/50 data-invalid:data-[state=open]:outline-destructive/20',
    className,
  )}
  data-slot="combobox-control"
/>