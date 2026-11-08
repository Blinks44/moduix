<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface CommandPaletteSeparatorProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './CommandPalette.module.css';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: CommandPaletteSeparatorProps = $props();
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  role="separator"
  class={clsx(styles.separator, className)}
  data-slot="command-palette-separator"
/>