<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface TableRowProps extends HTMLProps<'tr'>, PolymorphicProps<'tr'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Table.module.css';

  let { class: className, ref = $bindable(null), ...props }: TableRowProps = $props();
</script>

<Ark
  as="tr"
  {...props}
  bind:ref
  class={clsx(styles.row, className)}
  data-scope="table"
  data-part="row"
  data-slot="table-row"
/>