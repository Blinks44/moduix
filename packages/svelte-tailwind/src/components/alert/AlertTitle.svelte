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
  class={cn('m-0 min-w-0 text-sm font-semibold [overflow-wrap:anywhere]', className)}
  data-scope="alert"
  data-part="title"
  data-slot="alert-title"
/>