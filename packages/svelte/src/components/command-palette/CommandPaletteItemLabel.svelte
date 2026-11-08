<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface CommandPaletteItemLabelProps
    extends HTMLProps<'span'>, PolymorphicProps<'span'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './CommandPalette.module.css';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: CommandPaletteItemLabelProps = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  class={clsx(styles.itemLabel, className)}
  data-slot="command-palette-item-label"
/>