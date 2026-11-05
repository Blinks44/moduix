<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  type Props = HTMLProps<'kbd'> & PolymorphicProps<'kbd'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="kbd"
  {...props}
  bind:ref
  class={cn(
    `inline-flex min-h-control-xs min-w-control-xs flex-none items-center justify-center gap-1 rounded-sm border border-border bg-muted px-2 align-middle font-mono text-xs font-medium whitespace-nowrap text-foreground tabular-nums shadow-[inset_0_-1px_0_color-mix(in_oklab,currentColor_12%,transparent)] select-none [&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-3`,
    className,
  )}
  data-scope="kbd"
  data-part="root"
  data-slot="kbd-root"
/>