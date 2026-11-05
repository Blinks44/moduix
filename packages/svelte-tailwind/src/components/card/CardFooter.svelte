<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  type Props = HTMLProps<'div'> & PolymorphicProps<'div'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={cn(
    'flex min-w-0 flex-wrap items-center gap-2 px-(--card-spacing) pt-(--card-spacing) last:pb-(--card-spacing)',
    className,
  )}
  data-scope="card"
  data-part="footer"
  data-slot="card-footer"
/>