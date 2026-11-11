<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Card.module.css';

  type Props = HTMLProps<'h3'> & PolymorphicProps<'h3'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="h3"
  {...props}
  bind:ref
  class={clsx(styles.title, className)}
  data-scope="card"
  data-part="title"
  data-slot="card-title"
/>