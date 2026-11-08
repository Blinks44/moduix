<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface CommandPaletteSeparatorProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
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
  class={cn('m-2 h-px bg-border', className)}
  data-slot="command-palette-separator"
/>