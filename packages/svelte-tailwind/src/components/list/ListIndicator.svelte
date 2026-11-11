<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  const listIndicatorClass =
    "inline-flex shrink-0 items-center justify-center min-h-lh me-2 [&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-[1em]";

  type Props = HTMLProps<'span'> & PolymorphicProps<'span'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  class={cn(listIndicatorClass, className)}
  data-scope="list"
  data-part="indicator"
  data-slot="list-indicator"
/>