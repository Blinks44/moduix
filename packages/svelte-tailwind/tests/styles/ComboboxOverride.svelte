<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import { Combobox, ComboboxControl, ComboboxInput, ComboboxLabel } from '@/components/combobox';

  const collection = createListCollection({ items: [{ label: 'Apple', value: 'apple' }] });
  let root: Element | null = $state(null);

  export const getRoot = () => root;
</script>

<Combobox bind:ref={root} class="consumer-root w-80" {collection}>
  {#snippet asChild(props)}
    <section {...props()} aria-label="Fruit selection">
      <ComboboxLabel class="consumer-label">Fruit</ComboboxLabel>
      <ComboboxControl class="consumer-control">
        <ComboboxInput class="consumer-input" />
      </ComboboxControl>
    </section>
  {/snippet}
</Combobox>