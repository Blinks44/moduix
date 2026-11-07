<script lang="ts">
  import { ComboboxInput, type ComboboxInputProps } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';

  let { asChild, class: className, ref = $bindable(null), ...props }: ComboboxInputProps = $props();
</script>

<ComboboxInput
  {...props}
  bind:ref
  {asChild}
  class={cn(
    !asChild &&
      'm-0 h-control-md w-full min-w-0 rounded-[inherit] border-0 bg-transparent px-3.5 text-inherit outline-0 [font:inherit] group-has-[>[data-slot=combobox-clear-trigger]]/combobox-control:pe-11 group-has-[>[data-slot=combobox-trigger]]/combobox-control:pe-11 group-has-[>[data-slot=combobox-clear-trigger]]/combobox-control:group-has-[>[data-slot=combobox-trigger]]/combobox-control:pe-[4.375rem] placeholder:text-muted-foreground',
    className,
  )}
  data-slot="combobox-input"
/>