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
    'relative z-1 col-start-2 row-span-2 row-start-1 inline-flex items-start justify-end gap-2',
    className,
  )}
  data-scope="card"
  data-part="action"
  data-slot="card-action"
/>