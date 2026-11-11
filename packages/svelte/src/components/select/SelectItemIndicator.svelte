<script lang="ts">
  import { SelectItemIndicator, type SelectItemIndicatorProps } from '@ark-ui/svelte/select';
  import { clsx } from 'clsx';
  import { CheckIcon } from '@/lib/moduix/icons/ui';
  import styles from './Select.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: SelectItemIndicatorProps = $props();
</script>

<SelectItemIndicator
  {...props}
  bind:ref
  class={clsx(styles.itemIndicator, className)}
  data-slot="select-item-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <CheckIcon />
  {/if}
</SelectItemIndicator>