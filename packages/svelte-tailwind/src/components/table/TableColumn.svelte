<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface TableColumnProps
    extends HTMLProps<'col'>, PolymorphicProps<'col'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';

  let { class: className, ref = $bindable(null), ...props }: TableColumnProps = $props();
</script>

<Ark
  as="col"
  {...props}
  bind:ref
  class={className}
  data-scope="table"
  data-part="column"
  data-slot="table-column"
/>