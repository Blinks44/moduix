<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  type Props = HTMLProps<'p'> & PolymorphicProps<'p'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="p"
  {...props}
  bind:ref
  class={cn('min-w-0 text-sm wrap-anywhere text-muted-foreground', className)}
  data-scope="card"
  data-part="description"
  data-slot="card-description"
/>