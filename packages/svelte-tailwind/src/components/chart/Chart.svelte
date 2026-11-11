<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
  type Props = HTMLProps<'figure'> & PolymorphicProps<'figure'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="figure"
  {...props}
  bind:ref
  class={cn(
    'grid w-full min-w-0 gap-5 rounded-lg border border-border bg-card p-5 text-card-foreground shadow-sm',
    className,
  )}
  data-scope="chart"
  data-part="root"
  data-slot="chart-root"
/>