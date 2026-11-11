<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface TableCaptionProps
    extends HTMLProps<'caption'>, PolymorphicProps<'caption'>, RefAttribute {
    side?: 'top' | 'bottom';
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Table.module.css';

  let {
    class: className,
    side = 'bottom',
    ref = $bindable(null),
    ...props
  }: TableCaptionProps = $props();
</script>

<Ark
  as="caption"
  {...props}
  bind:ref
  class={clsx(styles.caption, className)}
  data-scope="table"
  data-part="caption"
  data-side={side}
  data-slot="table-caption"
/>