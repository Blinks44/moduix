<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface CommandPaletteKbdProps
    extends HTMLProps<'kbd'>, PolymorphicProps<'kbd'>, RefAttribute {}
</script>

<script lang="ts">
  import { clsx } from 'clsx';
  import Kbd from '../kbd/Kbd.svelte';
  import styles from './CommandPalette.module.css';

  let { class: className, ref = $bindable(null), ...props }: CommandPaletteKbdProps = $props();
</script>

<Kbd {...props} bind:ref class={clsx(styles.kbd, className)} data-slot="command-palette-kbd" />