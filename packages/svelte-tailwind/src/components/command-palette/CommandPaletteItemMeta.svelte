<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface CommandPaletteItemMetaProps
    extends HTMLProps<'span'>, PolymorphicProps<'span'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: CommandPaletteItemMetaProps = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  class={cn(
    'ms-auto shrink-0 text-xs leading-4 whitespace-nowrap text-muted-foreground',
    className,
  )}
  data-slot="command-palette-item-meta"
/>