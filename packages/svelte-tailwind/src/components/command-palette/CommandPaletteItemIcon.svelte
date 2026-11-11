<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface CommandPaletteItemIconProps
    extends HTMLProps<'span'>, PolymorphicProps<'span'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: CommandPaletteItemIconProps = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  class={cn(
    `inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4`,
    className,
  )}
  data-slot="command-palette-item-icon"
/>