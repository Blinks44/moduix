<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
  type Props = HTMLProps<'figcaption'> & PolymorphicProps<'figcaption'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="figcaption"
  {...props}
  bind:ref
  class={cn('grid gap-1', className)}
  data-scope="chart"
  data-part="header"
  data-slot="chart-header"
/>