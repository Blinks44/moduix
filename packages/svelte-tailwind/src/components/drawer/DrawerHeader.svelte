<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  type Props = HTMLProps<'div'> & PolymorphicProps<'div'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();

  const headerClass =
    "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-1 [&>[data-slot='drawer-close-icon']]:col-start-2 [&>[data-slot='drawer-description']]:col-span-2 [&>[data-slot='drawer-title']]:col-start-1";
</script>

<Ark as="div" {...props} bind:ref class={cn(headerClass, className)} data-slot="drawer-header" />