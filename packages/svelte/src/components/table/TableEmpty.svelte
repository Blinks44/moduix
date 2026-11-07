<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface TableEmptyProps extends HTMLProps<'td'>, PolymorphicProps<'td'>, RefAttribute {
    colSpan: number;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import styles from './Table.module.css';
  import TableRow from './TableRow.svelte';

  let {
    children,
    class: className,
    colSpan,
    ref = $bindable(null),
    ...props
  }: TableEmptyProps = $props();
</script>

<TableRow data-empty>
  <Ark
    as="td"
    {...props}
    bind:ref
    class={clsx(styles.cell, styles.empty, className)}
    colspan={colSpan}
    data-scope="table"
    data-part="empty"
    data-slot="table-empty"
  >
    {#if children}
      {@render children()}
    {:else}
      {a11yLabels.noResults}
    {/if}
  </Ark>
</TableRow>