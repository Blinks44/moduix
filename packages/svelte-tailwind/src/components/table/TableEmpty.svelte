<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface TableEmptyProps extends HTMLProps<'td'>, PolymorphicProps<'td'>, RefAttribute {
    colSpan: number;
  }

  const cellClass =
    'relative z-0 border-border px-4 py-3 group-data-[size=lg]/table:px-5 group-data-[size=lg]/table:py-4 group-data-[size=sm]/table:px-3 group-data-[size=sm]/table:py-2 data-sticky:sticky data-sticky:z-2 data-sticky:bg-card data-sticky:bg-[image:linear-gradient(var(--_table-row-bg),var(--_table-row-bg))] data-[sticky=end]:end-0 data-[sticky=start]:start-0 group-data-[show-column-border]/table:not-last:border-e';
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { cn } from '@/lib/moduix/cn';
  import TableRow from './TableRow.svelte';

  let {
    children,
    class: className,
    colSpan,
    ref = $bindable(null),
    ...props
  }: TableEmptyProps = $props();
</script>

<TableRow data-empty>
  <Ark
    as="td"
    {...props}
    bind:ref
    class={cn(
      cellClass,
      'py-6 text-center text-muted-foreground group-data-[size=lg]/table:py-8 group-data-[size=sm]/table:py-4',
      className,
    )}
    colspan={colSpan}
    data-scope="table"
    data-part="empty"
    data-slot="table-empty"
  >
    {#if children}
      {@render children()}
    {:else}
      {a11yLabels.noResults}
    {/if}
  </Ark>
</TableRow>