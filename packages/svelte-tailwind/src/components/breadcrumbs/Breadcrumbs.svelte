<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';

  type Props = HTMLProps<'nav'> & PolymorphicProps<'nav'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="nav"
  aria-label={a11yLabels.breadcrumb}
  {...props}
  bind:ref
  class={cn('max-w-full text-sm text-muted-foreground', className)}
  data-slot="breadcrumbs-root"
/>