<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Chart.module.css';
  type Props = HTMLProps<'figcaption'> & PolymorphicProps<'figcaption'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="figcaption"
  {...props}
  bind:ref
  class={clsx(styles.header, className)}
  data-scope="chart"
  data-part="header"
  data-slot="chart-header"
/>