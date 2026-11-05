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
    'grid w-full min-w-0 justify-items-center gap-4 rounded-xl border border-border bg-[color-mix(in_oklab,var(--color-card)_92%,var(--color-muted))] p-8 text-center text-card-foreground',
    className,
  )}
  data-scope="empty"
  data-part="root"
  data-slot="empty-root"
/>