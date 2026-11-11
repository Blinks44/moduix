<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface TableColumnHeaderProps
    extends HTMLProps<'th'>, PolymorphicProps<'th'>, RefAttribute {
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
  }: TableColumnHeaderProps = $props();
</script>

<Ark
  as="th"
  {...props}
  bind:ref
  class={clsx(styles.columnHeader, numeric && styles.numeric, className)}
  data-scope="table"
  data-part="column-header"
  data-numeric={numeric || undefined}
  data-slot="table-column-header"
/>