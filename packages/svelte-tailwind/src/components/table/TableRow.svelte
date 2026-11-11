<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface TableRowProps extends HTMLProps<'tr'>, PolymorphicProps<'tr'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TableRowProps = $props();

  const rowClass =
    'border-border bg-(--_table-row-bg) [--_table-row-bg:initial] in-data-[slot=table-body]:not-last:border-b group-data-[striped]/table:in-data-[slot=table-body]:even:not-data-empty:[--_table-row-bg:color-mix(in_oklab,var(--color-muted)_35%,transparent)] group-data-[interactive]/table:in-data-[slot=table-body]:not-data-empty:focus-within:[--_table-row-bg:var(--color-muted)] group-data-[interactive]/table:in-data-[slot=table-body]:not-data-empty:hover:[--_table-row-bg:var(--color-muted)] in-data-[slot=table-header]:border-b';
</script>

<Ark
  as="tr"
  {...props}
  bind:ref
  class={cn(rowClass, className)}
  data-scope="table"
  data-part="row"
  data-slot="table-row"
/>