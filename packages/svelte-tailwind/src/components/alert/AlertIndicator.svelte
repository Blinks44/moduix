<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  type Props = HTMLProps<'span'> & PolymorphicProps<'span'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="span"
  aria-hidden="true"
  {...props}
  bind:ref
  class={cn(
    'mt-0.5 inline-flex shrink-0 items-center justify-center text-(color:--_alert-indicator-color) [&_svg]:pointer-events-none [&_svg]:shrink-0 [:where(&_svg)]:size-4',
    className,
  )}
  data-scope="alert"
  data-part="indicator"
  data-slot="alert-indicator"
/>