<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    CommandPalette,
    CommandPaletteCombobox,
    CommandPaletteList,
    CommandPalettePanel,
    CommandPaletteSearch,
  } from '@/components/command-palette';

  let { inputValueChange }: { inputValueChange: (details: unknown) => void } = $props();
  const collection = createListCollection({
    items: [{ label: 'Open settings', value: 'settings' }],
  });
  let inputValue = $state('');
  let disabled = $state(false);
  let comboboxRef: Element | null = $state(null);

  export const getInputValue = () => inputValue;
  export const getRef = () => comboboxRef;
  export const update = () => {
    inputValue = 'external';
    disabled = true;
  };
</script>

<CommandPalette defaultOpen portalled={false} aria-label="Combobox contracts">
  <CommandPalettePanel>
    <CommandPaletteCombobox
      bind:ref={comboboxRef}
      {collection}
      bind:inputValue
      {disabled}
      onInputValueChange={inputValueChange}
      data-testid="combobox"
      class="consumer-combobox"
    >
      {#snippet asChild(props)}
        <section {...props()}>
          <CommandPaletteSearch />
          <CommandPaletteList />
        </section>
      {/snippet}
    </CommandPaletteCombobox>
  </CommandPalettePanel>
</CommandPalette>