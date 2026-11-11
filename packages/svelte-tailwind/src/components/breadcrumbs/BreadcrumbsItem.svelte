<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  type Props = HTMLProps<'li'> & PolymorphicProps<'li'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="li"
  {...props}
  bind:ref
  class={cn('inline-flex min-w-0 items-center', className)}
  data-slot="breadcrumbs-item"
/>