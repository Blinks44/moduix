<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  type Props = HTMLProps<'ol'> & PolymorphicProps<'ol'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="ol"
  {...props}
  bind:ref
  class={cn(
    'flex min-w-0 items-center gap-1 whitespace-nowrap [&>[data-slot=breadcrumbs-item]:last-child]:max-w-64 [&>[data-slot=breadcrumbs-item]:last-child]:flex-auto',
    className,
  )}
  data-slot="breadcrumbs-list"
/>