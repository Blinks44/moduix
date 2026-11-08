<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface CommandPaletteHeaderProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: CommandPaletteHeaderProps = $props();
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={cn('grid gap-1 px-4 pt-4', className)}
  data-slot="command-palette-header"
/>