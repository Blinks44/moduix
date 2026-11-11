<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface TableColumnHeaderProps
    extends HTMLProps<'th'>, PolymorphicProps<'th'>, RefAttribute {
    numeric?: boolean;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    numeric = false,
    ref = $bindable(null),
    ...props
  }: TableColumnHeaderProps = $props();

  const cellClass =
    'relative z-0 border-border px-4 py-3 group-data-[size=lg]/table:px-5 group-data-[size=lg]/table:py-4 group-data-[size=sm]/table:px-3 group-data-[size=sm]/table:py-2 data-sticky:sticky data-sticky:z-2 data-sticky:bg-card data-sticky:bg-[image:linear-gradient(var(--_table-row-bg),var(--_table-row-bg))] data-[sticky=end]:end-0 data-[sticky=start]:start-0 group-data-[show-column-border]/table:not-last:border-e';
</script>

<Ark
  as="th"
  {...props}
  bind:ref
  class={cn(
    cellClass,
    'text-start font-medium whitespace-nowrap text-muted-foreground',
    numeric && 'text-end whitespace-nowrap tabular-nums',
    className,
  )}
  data-scope="table"
  data-part="column-header"
  data-numeric={numeric || undefined}
  data-slot="table-column-header"
/>