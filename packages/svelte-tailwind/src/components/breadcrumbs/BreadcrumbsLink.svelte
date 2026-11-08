<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  type Props = HTMLProps<'a'> & PolymorphicProps<'a'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="a"
  {...props}
  bind:ref
  class={cn(
    'block max-w-full min-w-0 truncate rounded-sm px-1 text-inherit no-underline transition-[color] duration-normal ease-in-out outline-none focus-visible:ring-(length:--moduix-focus-ring-inset-width) focus-visible:ring-ring [@media(hover:hover)]:hover:text-foreground',
    className,
  )}
  data-slot="breadcrumbs-link"
/>