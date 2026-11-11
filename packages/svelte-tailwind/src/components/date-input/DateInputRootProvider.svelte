<script lang="ts">
  import {
    DateInputRootProvider,
    type DateInputRootProviderProps,
  } from '@ark-ui/svelte/date-input';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ...props }: DateInputRootProviderProps = $props();
  const rootClass =
    'inline-flex max-w-full flex-col items-start gap-1 data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';
</script>

<DateInputRootProvider
  {...props}
  class={cn(rootClass, className)}
  data-slot="date-input-root-provider"
/>