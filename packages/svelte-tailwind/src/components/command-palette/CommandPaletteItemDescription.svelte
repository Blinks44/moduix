<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface CommandPaletteItemDescriptionProps
    extends HTMLProps<'span'>, PolymorphicProps<'span'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: CommandPaletteItemDescriptionProps = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  class={cn(
    'overflow-hidden text-xs leading-4 text-ellipsis whitespace-nowrap text-muted-foreground',
    className,
  )}
  data-slot="command-palette-item-description"
/>