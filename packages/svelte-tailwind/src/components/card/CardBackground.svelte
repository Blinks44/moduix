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
    'absolute inset-0 -z-1 overflow-hidden rounded-[inherit] [&>:is(img,picture,video,canvas,svg,iframe)]:size-full [&>:is(img,picture,video,canvas,svg,iframe)]:object-cover [&>picture]:block [&>picture>img]:size-full [&>picture>img]:object-cover',
    className,
  )}
  data-scope="card"
  data-part="background"
  data-slot="card-background"
/>