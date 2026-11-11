<script lang="ts">
  import type { PropsFn } from '@ark-ui/svelte';
  import {
    SignaturePadClearTrigger,
    type SignaturePadClearTriggerProps,
  } from '@ark-ui/svelte/signature-pad';
  import { clsx } from 'clsx';
  import { RotateCcwIcon } from '@/lib/moduix/icons/ui';
  import CloseButton from '../close-button/CloseButton.svelte';
  import { getSignaturePadReadOnly } from './context';
  import styles from './SignaturePad.module.css';

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
  class={clsx(styles.clearTrigger, className)}
  data-slot="signature-pad-clear-trigger"
/>