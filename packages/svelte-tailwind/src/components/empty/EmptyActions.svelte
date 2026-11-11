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
    'flex min-w-0 flex-wrap items-center justify-center gap-2 [&>*]:max-w-full [&>*]:min-w-0 [&>:is(button,a)]:wrap-anywhere [&>:is(button,a)]:whitespace-normal',
    className,
  )}
  data-scope="empty"
  data-part="actions"
  data-slot="empty-actions"
/>