<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  type Props = HTMLProps<'span'> & PolymorphicProps<'span'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  class={cn(
    'inline-flex max-w-full flex-wrap items-center gap-1 align-middle text-muted-foreground',
    className,
  )}
  role="group"
  data-scope="kbd"
  data-part="group"
  data-slot="kbd-group"
/>