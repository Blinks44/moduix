<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface TableColumnGroupProps
    extends HTMLProps<'colgroup'>, PolymorphicProps<'colgroup'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';

  let { class: className, ref = $bindable(null), ...props }: TableColumnGroupProps = $props();
</script>

<Ark
  as="colgroup"
  {...props}
  bind:ref
  class={className}
  data-scope="table"
  data-part="column-group"
  data-slot="table-column-group"
/>