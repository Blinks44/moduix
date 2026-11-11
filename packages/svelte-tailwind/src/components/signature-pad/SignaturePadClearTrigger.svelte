<script lang="ts">
  import type { PropsFn } from '@ark-ui/svelte';
  import {
    SignaturePadClearTrigger,
    type SignaturePadClearTriggerProps,
  } from '@ark-ui/svelte/signature-pad';
  import { cn } from '@/lib/moduix/cn';
  import { RotateCcwIcon } from '@/lib/moduix/icons/ui';
  import CloseButton from '../close-button/CloseButton.svelte';
  import { getSignaturePadReadOnly } from './context';

  let {
    asChild,
    children,
    class: className,
    disabled,
    ref = $bindable(null),
    ...props
  }: SignaturePadClearTriggerProps = $props();

  const readOnly = getSignaturePadReadOnly();
  // Ark merges props with undefined winning, so only pass state that is set.
  const stateProps = $derived({
    ...(disabled === undefined ? {} : { disabled }),
    ...(readOnly?.() ? { hidden: true } : {}),
  });
</script>

<!-- Ark still clears read-only signatures, so moduix hides the action as it does while empty. -->
{#snippet closeButton(triggerProps: PropsFn<'button'>)}
  <CloseButton {...triggerProps()}>
    {#if children}
      {@render children()}
    {:else}
      <RotateCcwIcon aria-hidden="true" />
    {/if}
  </CloseButton>
{/snippet}

<SignaturePadClearTrigger
  {...props}
  {...stateProps}
  bind:ref
  asChild={asChild ?? closeButton}
  class={cn('absolute end-2 top-2 size-control-xs data-disabled:opacity-100', className)}
  data-slot="signature-pad-clear-trigger"
/>