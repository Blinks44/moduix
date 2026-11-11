<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Chart.module.css';
  type Props = HTMLProps<'p'> & PolymorphicProps<'p'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="p"
  {...props}
  bind:ref
  class={clsx(styles.description, className)}
  data-scope="chart"
  data-part="description"
  data-slot="chart-description"
/>