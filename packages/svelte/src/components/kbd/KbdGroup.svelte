<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Kbd.module.css';

  type Props = HTMLProps<'span'> & PolymorphicProps<'span'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  class={clsx(styles.group, className)}
  role="group"
  data-scope="kbd"
  data-part="group"
  data-slot="kbd-group"
/>