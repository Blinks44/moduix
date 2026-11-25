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
    useListCollection,
    type ComboboxInputValueChangeDetails,
  } from '@moduix/svelte/combobox';
  const domains = ['gmail.com', 'outlook.com', 'proton.me'];
  const { collection, set } = useListCollection<string>({ initialItems: [] });

  function handleInputValueChange(details: ComboboxInputValueChangeDetails) {
    if (details.reason !== 'input-change') return;
    const name = details.inputValue.trim();
    set(name ? domains.map((domain) => name + '@' + domain) : []);
  }
</script>

<Combobox collection={collection()} onInputValueChange={handleInputValueChange}>
  <ComboboxLabel>Email</ComboboxLabel>
  <ComboboxControl>
    <ComboboxInput placeholder="e.g. alex" />
    <ComboboxTrigger aria-label="Open options" />
  </ComboboxControl>
  <ComboboxPositioner>
    <ComboboxContent>
      <ComboboxList>
        {#each collection().items as item (item)}
          <ComboboxOption {item}>{item}</ComboboxOption>
        {/each}
      </ComboboxList>
    </ComboboxContent>
  </ComboboxPositioner>
</Combobox>