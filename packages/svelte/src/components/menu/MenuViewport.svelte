<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Menu.module.css';

  type Props = HTMLProps<'div'> & PolymorphicProps<'div'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={clsx(styles.viewport, className)}
  data-scope="menu"
  data-part="viewport"
  data-slot="menu-viewport"
/>