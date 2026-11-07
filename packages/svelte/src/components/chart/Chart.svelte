<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Chart.module.css';
  type Props = HTMLProps<'figure'> & PolymorphicProps<'figure'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="figure"
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-scope="chart"
  data-part="root"
  data-slot="chart-root"
/>