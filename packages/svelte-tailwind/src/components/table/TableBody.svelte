<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface TableBodyProps
    extends HTMLProps<'tbody'>, PolymorphicProps<'tbody'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';

  let { class: className, ref = $bindable(null), ...props }: TableBodyProps = $props();
</script>

<Ark
  as="tbody"
  {...props}
  bind:ref
  class={className}
  data-scope="table"
  data-part="body"
  data-slot="table-body"
/>