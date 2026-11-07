<script lang="ts">
  import { DateInputRoot, type DateInputRootProps } from '@ark-ui/svelte/date-input';
  import { cn } from '@/lib/moduix/cn';
  let {
    class: className,
    placeholderValue = $bindable(),
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: DateInputRootProps = $props();
  const rootClass =
    'inline-flex max-w-full flex-col items-start gap-1 data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';
</script>

<DateInputRoot
  {...props}
  bind:ref
  bind:value
  bind:placeholderValue
  class={cn(rootClass, className)}
  data-slot="date-input-root"
/>