<script lang="ts">
  import {
    Combobox,
    ComboboxContent,
    ComboboxControl,
    ComboboxInput,
    ComboboxOption,
    ComboboxLabel,
    ComboboxList,
    ComboboxPositioner,
  } from '@/components/combobox';
  import { fruits } from '../select/fruits';
</script>

<Combobox collection={fruits} defaultOpen portalled={false}>
  <ComboboxLabel>Server fruit</ComboboxLabel>
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