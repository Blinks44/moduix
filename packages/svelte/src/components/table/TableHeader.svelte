<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface TableHeaderProps
    extends HTMLProps<'thead'>, PolymorphicProps<'thead'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Table.module.css';

  let { class: className, ref = $bindable(null), ...props }: TableHeaderProps = $props();
</script>

<Ark
  as="thead"
  {...props}
  bind:ref
  class={clsx(styles.header, className)}
  data-scope="table"
  data-part="header"
  data-slot="table-header"
/>