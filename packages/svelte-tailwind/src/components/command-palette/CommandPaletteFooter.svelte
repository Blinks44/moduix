<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface CommandPaletteFooterProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: CommandPaletteFooterProps = $props();
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={cn(
    'flex flex-none items-center justify-between gap-3 border-t border-border px-4 py-2 text-xs leading-4 text-muted-foreground',
    className,
  )}
  data-slot="command-palette-footer"
/>