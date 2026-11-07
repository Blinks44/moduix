<script lang="ts">
  import { ListboxItemIndicator, type ListboxItemIndicatorProps } from '@ark-ui/svelte/listbox';
  import { clsx } from 'clsx';
  import { CheckIcon } from '@/lib/moduix/icons/ui';
  import styles from './Listbox.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: ListboxItemIndicatorProps = $props();
</script>

<ListboxItemIndicator
  {...props}
  bind:ref
  class={clsx(styles.itemIndicator, className)}
  data-slot="listbox-item-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <CheckIcon />
  {/if}
</ListboxItemIndicator>