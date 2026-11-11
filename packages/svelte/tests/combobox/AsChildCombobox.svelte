<script lang="ts">
  import { Combobox, ComboboxControl, ComboboxInput, ComboboxLabel } from '@/components/combobox';
  import { fruits } from '../select/fruits';

  let root: Element | null = $state(null);

  export const getRoot = () => root;
</script>

<Combobox bind:ref={root} collection={fruits}>
  {#snippet asChild(props)}
    <section {...props()} aria-label="Fruit selection">
      <ComboboxLabel>Fruit</ComboboxLabel>
      <ComboboxControl><ComboboxInput /></ComboboxControl>
    </section>
  {/snippet}
</Combobox>