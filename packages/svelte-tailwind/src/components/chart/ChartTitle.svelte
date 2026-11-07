<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
  type Props = HTMLProps<'h3'> & PolymorphicProps<'h3'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="h3"
  {...props}
  bind:ref
  class={cn('text-lg font-semibold', className)}
  data-scope="chart"
  data-part="title"
  data-slot="chart-title"
/>