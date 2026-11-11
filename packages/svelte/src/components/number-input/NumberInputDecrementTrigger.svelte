<script lang="ts">
  import {
    NumberInputDecrementTrigger,
    type NumberInputDecrementTriggerProps,
  } from '@ark-ui/svelte/number-input';
  import { clsx } from 'clsx';
  import { MinusIcon } from '@/lib/moduix/icons/ui';
  import styles from './NumberInput.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: NumberInputDecrementTriggerProps = $props();
</script>

<NumberInputDecrementTrigger
  {...props}
  bind:ref
  class={clsx(styles.decrementTrigger, className)}
  data-slot="number-input-decrement-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <MinusIcon />
  {/if}
</NumberInputDecrementTrigger>