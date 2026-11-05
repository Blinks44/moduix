<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Kbd.module.css';

  type Props = HTMLProps<'kbd'> & PolymorphicProps<'kbd'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="kbd"
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-scope="kbd"
  data-part="root"
  data-slot="kbd-root"
/>