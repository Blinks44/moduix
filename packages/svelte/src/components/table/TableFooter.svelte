<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface TableFooterProps
    extends HTMLProps<'tfoot'>, PolymorphicProps<'tfoot'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Table.module.css';

  let { class: className, ref = $bindable(null), ...props }: TableFooterProps = $props();
</script>

<Ark
  as="tfoot"
  {...props}
  bind:ref
  class={clsx(styles.footer, className)}
  data-scope="table"
  data-part="footer"
  data-slot="table-footer"
/>