<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Badge.module.css';

  type Props = HTMLProps<'span'> & PolymorphicProps<'span'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  class={clsx(styles.dot, className)}
  data-scope="badge"
  data-part="dot"
  data-slot="badge-dot"
  aria-hidden="true"
/>