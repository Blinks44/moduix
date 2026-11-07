<script module lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  export interface ListboxFilterProps extends HTMLAttributes<HTMLDivElement> {
    ref?: HTMLDivElement | null;
  }
</script>

<script lang="ts">
  import { clsx } from 'clsx';
  import { SearchIcon } from '@/lib/moduix/icons/ui';
  import styles from './Listbox.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: ListboxFilterProps = $props();
</script>

<div {...props} bind:this={ref} class={clsx(styles.filter, className)} data-slot="listbox-filter">
  <SearchIcon data-slot="listbox-filter-icon" class={styles.filterIcon} />
  {@render children?.()}
</div>