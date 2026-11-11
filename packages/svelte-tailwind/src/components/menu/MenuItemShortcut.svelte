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
  class={cn('ms-auto ps-4 text-xs whitespace-nowrap text-muted-foreground', className)}
  data-slot="menu-item-shortcut"
/>