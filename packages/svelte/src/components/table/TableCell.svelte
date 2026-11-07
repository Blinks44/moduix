<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface TableCellProps extends HTMLProps<'td'>, PolymorphicProps<'td'>, RefAttribute {
    numeric?: boolean;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Table.module.css';

  let {
    class: className,
    numeric = false,
    ref = $bindable(null),
    ...props
  }: TableCellProps = $props();
</script>

<Ark
  as="td"
  {...props}
  bind:ref
  class={clsx(styles.cell, numeric && styles.numeric, className)}
  data-scope="table"
  data-part="cell"
  data-numeric={numeric || undefined}
  data-slot="table-cell"
/>