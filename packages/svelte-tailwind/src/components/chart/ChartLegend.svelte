<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
  type Props = HTMLProps<'ul'> & PolymorphicProps<'ul'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="ul"
  {...props}
  bind:ref
  class={cn('flex flex-wrap gap-3', className)}
  data-scope="chart"
  data-part="legend"
  data-slot="chart-legend"
/>