<script lang="ts">
  import { ComboboxItemIndicator, type ComboboxItemIndicatorProps } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import { CheckIcon } from '@/lib/moduix/icons/ui';
  import styles from './Combobox.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: ComboboxItemIndicatorProps = $props();
</script>

<ComboboxItemIndicator
  {...props}
  bind:ref
  class={clsx(styles.itemIndicator, className)}
  data-slot="combobox-item-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <CheckIcon />
  {/if}
</ComboboxItemIndicator>