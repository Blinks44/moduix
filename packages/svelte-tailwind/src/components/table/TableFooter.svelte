<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface TableFooterProps
    extends HTMLProps<'tfoot'>, PolymorphicProps<'tfoot'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TableFooterProps = $props();
</script>

<Ark
  as="tfoot"
  {...props}
  bind:ref
  class={cn('border-t border-border bg-muted font-medium', className)}
  data-scope="table"
  data-part="footer"
  data-slot="table-footer"
/>