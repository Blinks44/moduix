<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface CommandPaletteKbdProps
    extends HTMLProps<'kbd'>, PolymorphicProps<'kbd'>, RefAttribute {}
</script>

<script lang="ts">
  import { cn } from '@/lib/moduix/cn';
  import Kbd from '../kbd/Kbd.svelte';

  let { class: className, ref = $bindable(null), ...props }: CommandPaletteKbdProps = $props();
</script>

<Kbd
  {...props}
  bind:ref
  class={cn('min-h-5 min-w-5 px-1 text-muted-foreground', className)}
  data-slot="command-palette-kbd"
/>