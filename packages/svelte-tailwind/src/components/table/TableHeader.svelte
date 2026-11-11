<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface TableHeaderProps
    extends HTMLProps<'thead'>, PolymorphicProps<'thead'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TableHeaderProps = $props();
</script>

<Ark
  as="thead"
  {...props}
  bind:ref
  class={cn(
    'group-data-[sticky-header]/table:sticky group-data-[sticky-header]/table:top-0 group-data-[sticky-header]/table:z-3 group-data-[sticky-header]/table:bg-card',
    className,
  )}
  data-scope="table"
  data-part="header"
  data-slot="table-header"
/>