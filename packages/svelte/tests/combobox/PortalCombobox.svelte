<script lang="ts">
  import {
    Combobox,
    ComboboxContent,
    ComboboxControl,
    ComboboxInput,
    ComboboxLabel,
    ComboboxList,
    ComboboxOption,
    ComboboxPositioner,
  } from '@/components/combobox';
  import { fruits } from '../select/fruits';

  let root: Element | null = $state(null);

  export const getRoot = () => root;
</script>

<Combobox bind:ref={root} collection={fruits} defaultOpen>
  <ComboboxLabel>Portalled fruit</ComboboxLabel>
  <ComboboxControl><ComboboxInput /></ComboboxControl>
  <ComboboxPositioner>
    <ComboboxContent>
      <ComboboxList>
        {#each fruits.items as item (item.value)}
          <ComboboxOption {item}>{item.label}</ComboboxOption>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </ComboboxPositioner>
</Combobox>