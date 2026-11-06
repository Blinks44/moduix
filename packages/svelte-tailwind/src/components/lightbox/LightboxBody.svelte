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
    'grid gap-3 group-data-[state]/lightbox:[animation:inherit] group-data-[state=closed]/lightbox:[animation-name:moduix-lightbox-body-out] group-data-[state=open]/lightbox:[animation-name:moduix-lightbox-body-in]',
    className,
  )}
  data-slot="lightbox-body"
/>