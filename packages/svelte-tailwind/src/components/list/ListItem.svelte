<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';

  type Props = HTMLProps<'li'> & PolymorphicProps<'li'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="li"
  {...props}
  bind:ref
  class={className}
  data-scope="list"
  data-part="item"
  data-slot="list-item"
/>