<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface CommandPaletteItemIconProps
    extends HTMLProps<'span'>, PolymorphicProps<'span'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './CommandPalette.module.css';
  let { class: className, ref = $bindable(null), ...props }: CommandPaletteItemIconProps = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  class={clsx(styles.itemIcon, className)}
  data-slot="command-palette-item-icon"
/>