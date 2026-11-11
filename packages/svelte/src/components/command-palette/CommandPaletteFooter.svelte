<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface CommandPaletteFooterProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './CommandPalette.module.css';
  let { class: className, ref = $bindable(null), ...props }: CommandPaletteFooterProps = $props();
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={clsx(styles.footer, className)}
  data-slot="command-palette-footer"
/>