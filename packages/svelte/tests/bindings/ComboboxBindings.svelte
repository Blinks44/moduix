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
    ComboboxTrigger,
  } from '@/components/combobox';
  import { fruits } from '../select/fruits';

  let { initialOpen = false }: { initialOpen?: boolean } = $props();
  // svelte-ignore state_referenced_locally
  let open = $state(initialOpen);
  let value = $state<string[]>([]);
  let inputValue = $state('');
  let highlightedValue = $state<string | null>(null);

  export const write = (key: 'open' | 'value' | 'inputValue' | 'highlightedValue') => {
    if (key === 'open') open = true;
    if (key === 'value') value = ['mango'];
    if (key === 'inputValue') inputValue = 'ext';
    if (key === 'highlightedValue') highlightedValue = 'apple';
  };
  export const read = () => ({ open, value, inputValue, highlightedValue });
</script>

<Combobox
  bind:open
  bind:value
  bind:inputValue
  bind:highlightedValue
  collection={fruits}
  portalled={false}
>
  <ComboboxLabel>Fruit</ComboboxLabel>
  <ComboboxControl>
    <ComboboxInput />
    <ComboboxTrigger aria-label="Open fruits" />
  </ComboboxControl>
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