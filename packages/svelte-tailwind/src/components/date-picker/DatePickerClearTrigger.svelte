<script lang="ts">
  import {
    DatePickerClearTrigger,
    type DatePickerClearTriggerProps,
  } from '@ark-ui/svelte/date-picker';
  import { cn } from '@/lib/moduix/cn';
  import CloseButton from '../close-button/CloseButton.svelte';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  }: DatePickerClearTriggerProps = $props();

  // Ark supplies the translated label, so only explicit consumer labels override it.
  const labelProps = $derived({
    ...(ariaLabel === undefined ? {} : { 'aria-label': ariaLabel }),
    ...(ariaLabelledBy === undefined ? {} : { 'aria-labelledby': ariaLabelledBy }),
  });
</script>

{#if asChild}
  <DatePickerClearTrigger
    {...props}
    {...labelProps}
    bind:ref
    {asChild}
    class={cn('absolute end-[2.125rem] top-1/2 size-control-xs -translate-y-1/2', className)}
    data-slot="date-picker-clear-trigger"
  />
{:else}
  <DatePickerClearTrigger
    {...props}
    bind:ref
    class={cn('absolute end-[2.125rem] top-1/2 size-control-xs -translate-y-1/2', className)}
    data-slot="date-picker-clear-trigger"
  >
    {#snippet asChild(triggerProps)}
      <CloseButton {...triggerProps()} {...labelProps} {children} />
    {/snippet}
  </DatePickerClearTrigger>
{/if}