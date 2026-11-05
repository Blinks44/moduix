<script lang="ts">
  import {
    NumberInputIncrementTrigger,
    type NumberInputIncrementTriggerProps,
  } from '@ark-ui/svelte/number-input';
  import { clsx } from 'clsx';
  import { PlusIcon } from '@/lib/moduix/icons/ui';
  import styles from './NumberInput.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: NumberInputIncrementTriggerProps = $props();
</script>

<NumberInputIncrementTrigger
  {...props}
  bind:ref
  class={clsx(styles.incrementTrigger, className)}
  data-slot="number-input-increment-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <PlusIcon />
  {/if}
</NumberInputIncrementTrigger>