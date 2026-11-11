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
    'min-w-0 text-sm [overflow-wrap:anywhere] text-muted-foreground [&>:first-child]:mt-0 [&>:last-child]:mb-0',
    className,
  )}
  data-scope="alert"
  data-part="description"
  data-slot="alert-description"
/>