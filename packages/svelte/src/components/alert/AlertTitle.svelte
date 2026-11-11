<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Alert.module.css';

  type Props = HTMLProps<'p'> & PolymorphicProps<'p'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="p"
  {...props}
  bind:ref
  class={clsx(styles.title, className)}
  data-scope="alert"
  data-part="title"
  data-slot="alert-title"
/>