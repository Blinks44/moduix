<script lang="ts">
  import { SelectIndicator, type SelectIndicatorProps } from '@ark-ui/svelte/select';
  import { clsx } from 'clsx';
  import { ChevronUpDownIcon } from '@/lib/moduix/icons/ui';
  import styles from './Select.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: SelectIndicatorProps = $props();
</script>

<SelectIndicator
  {...props}
  bind:ref
  class={clsx(styles.indicator, className)}
  data-slot="select-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronUpDownIcon />
  {/if}
</SelectIndicator>