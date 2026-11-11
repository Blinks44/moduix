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
    'text-inherit no-underline after:absolute after:inset-0 after:rounded-lg focus-visible:outline-0 focus-visible:after:outline-focus focus-visible:after:outline-offset-1 focus-visible:after:outline-ring',
    className,
  )}
  data-scope="card"
  data-part="link"
  data-slot="card-link"
/>